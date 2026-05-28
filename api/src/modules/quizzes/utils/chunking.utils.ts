const CHARS_PER_TOKEN = 4;
const MAX_CHUNK_TOKENS = 4000;
const MAX_CHUNKS = 6;

export function estimateTokens(text: string): number {
    return Math.ceil(text.length / CHARS_PER_TOKEN);
}

export function chunkNoteContent(text: string): string[] {
    if (estimateTokens(text) <= MAX_CHUNK_TOKENS) {
        return [text];
    }

    const paragraphs = text.split(/\n\n+/);
    const chunks: string[] = [];
    let current = '';

    for (const paragraph of paragraphs) {
        const candidate = current ? `${current}\n\n${paragraph}` : paragraph;

        if (estimateTokens(candidate) > MAX_CHUNK_TOKENS && current) {
            chunks.push(current);
            current = paragraph;
        } else {
            current = candidate;
        }

        if (chunks.length >= MAX_CHUNKS - 1) {
            break;
        }
    }

    if (current) chunks.push(current);

    return chunks.slice(0, MAX_CHUNKS);
}

export function buildNoteContext(note: { title: string; content: string; summary?: string | null }): string {
    const header = `=== ${note.title} ===`;
    const body = note.summary ? `${note.summary}\n\n${note.content}` : note.content;
    return `${header}\n\n${body}`;
}
