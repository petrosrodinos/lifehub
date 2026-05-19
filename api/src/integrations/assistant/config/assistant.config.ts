import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssistantConfig {
    readonly model: string;
    readonly maxHistoryMessages: number;
    readonly notesRetrievalTopK: number;
    readonly noteSnippetMaxChars: number;
    readonly toolTimeoutMs: number;
    readonly imageToolTimeoutMs: number;

    constructor(private readonly configService: ConfigService) {
        this.model = this.configService.get<string>('ASSISTANT_MODEL') ?? 'gpt-4o-mini';
        this.maxHistoryMessages = Number(this.configService.get<string>('CHAT_MAX_HISTORY_MESSAGES') ?? 40);
        this.notesRetrievalTopK = Number(this.configService.get<string>('NOTES_RETRIEVAL_TOP_K') ?? 8);
        this.noteSnippetMaxChars = Number(this.configService.get<string>('NOTE_SNIPPET_MAX_CHARS') ?? 600);
        this.toolTimeoutMs = Number(this.configService.get<string>('ASSISTANT_TOOL_TIMEOUT_MS') ?? 15000);
        this.imageToolTimeoutMs = Number(this.configService.get<string>('ASSISTANT_IMAGE_TOOL_TIMEOUT_MS') ?? 60000);
    }
}
