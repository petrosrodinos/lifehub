import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AiService } from '@/integrations/ai/services/ai.service';
import { PineconeService } from '@/integrations/vector-db/pinecone.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';

export interface NoteRetrievalSnippet {
    uuid: string;
    title: string;
    type: string;
    content: string;
    summary: string | null;
    score: number;
}

export interface NotesSearchResult {
    notes: NoteRetrievalSnippet[];
    totalMatches: number;
}

export interface NotesSearchOptions {
    topK?: number;
}

@Injectable()
export class NotesRetrievalService {
    private readonly logger = new Logger(NotesRetrievalService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
        private readonly pineconeService: PineconeService,
        private readonly assistantConfig: AssistantConfig,
    ) {}

    async search(user_uuid: string, query: string, options?: NotesSearchOptions): Promise<NotesSearchResult> {
        const topK = options?.topK ?? this.assistantConfig.notesRetrievalTopK;
        const vector = await this.aiService.embedText(query);
        const matches = await this.pineconeService.queryVectors(vector, user_uuid, topK);

        if (matches.length === 0) {
            return { notes: [], totalMatches: 0 };
        }

        const uuids = matches.map((m) => m.id).filter(Boolean);
        const notes = await this.prisma.note.findMany({
            where: { uuid: { in: uuids }, user_uuid },
        });

        const noteByUuid = new Map(notes.map((n) => [n.uuid, n]));
        const maxChars = this.assistantConfig.noteSnippetMaxChars;
        const snippets: NoteRetrievalSnippet[] = [];

        for (const match of matches) {
            const note = noteByUuid.get(match.id);
            if (!note) continue;

            snippets.push({
                uuid: note.uuid,
                title: note.title,
                type: note.type,
                content: this.truncate(note.content, maxChars),
                summary: note.summary ? this.truncate(note.summary, maxChars) : null,
                score: match.score,
            });
        }

        this.logger.log(`Notes search for user ${user_uuid}: ${snippets.length} results`);

        return { notes: snippets, totalMatches: snippets.length };
    }

    private truncate(text: string, maxChars: number): string {
        if (text.length <= maxChars) return text;
        return `${text.slice(0, maxChars)}…`;
    }
}
