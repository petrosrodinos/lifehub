import { AiService } from '@/integrations/ai/services/ai.service';
import { AiProviders, AiModels } from '@/integrations/ai/interfaces/ai.interface';
import { NoteType } from '../dto/create-note.dto';

const MAX_TITLE_LENGTH = 120;
const CONTENT_PREVIEW_LENGTH = 2000;

export function fallbackNoteTitle(content: string): string {
    const snippet = content.replace(/\s+/g, ' ').trim();
    if (!snippet) return 'Untitled note';
    return snippet.length <= MAX_TITLE_LENGTH
        ? snippet
        : `${snippet.slice(0, MAX_TITLE_LENGTH - 1)}…`;
}

export function normalizeGeneratedTitle(raw: string): string {
    const cleaned = raw
        .trim()
        .replace(/^["']|["']$/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    if (!cleaned) return '';
    return cleaned.length <= MAX_TITLE_LENGTH
        ? cleaned
        : `${cleaned.slice(0, MAX_TITLE_LENGTH - 1)}…`;
}

export async function generateNoteTitle(
    aiService: AiService,
    content: string,
    type: NoteType,
): Promise<string> {
    const { response } = await aiService.generateText({
        provider: AiProviders.openai,
        model: AiModels.openai.gpt4oMini,
        system:
            'You generate short, descriptive note titles. Reply with ONLY the title text — no quotes, no markdown, no explanation.',
        prompt: `Generate a concise title (max 80 characters) for this ${type.toLowerCase()} note:\n\n${content.slice(0, CONTENT_PREVIEW_LENGTH)}`,
        maxTokens: 50,
    });
    const title = normalizeGeneratedTitle(response);
    return title || fallbackNoteTitle(content);
}
