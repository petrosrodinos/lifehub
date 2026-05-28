export function buildCardGenerationSystemPrompt(): string {
    return `You are an expert educator creating flash cards from study material.
Generate educational flash cards that test understanding, not just recall.
Each card must have: a clear concept on the front, a thorough explanation on the back, 2-5 keywords, and a visual description for an educational illustration.
Avoid duplicate concepts. Focus on the most important ideas.
Return only the requested JSON array — no markdown, no explanation.`;
}

export function buildCardGenerationUserPrompt(
    chunk: string,
    chunkIndex: number,
    totalChunks: number,
    cardsPerChunk: number,
): string {
    return `Extract up to ${cardsPerChunk} distinct flash cards from this study content.
Focus on the most important concepts, definitions, processes, and relationships.

Content (chunk ${chunkIndex + 1} of ${totalChunks}):
${chunk}

Rules:
- front: short concept name or question (max 120 chars)
- back: clear explanation with context (max 600 chars, plain text)
- keywords: 2-5 key terms from this concept
- ai_image_prompt: describe a simple educational diagram or illustration that visually shows this concept

Return a JSON array of flash card objects.`;
}

export function buildGroupTitlePrompt(cardFronts: string[]): string {
    return `Based on these flash card topics, generate a concise educational title for this flash card group.
The title should be 3-7 words, human-readable, and summarise the overall subject.

Topics: ${cardFronts.slice(0, 10).join(', ')}

Return only the title text, nothing else.`;
}

export function buildCardImagePrompt(card: {
    front: string;
    back: string;
    keywords: string[];
    ai_image_prompt?: string;
}): string {
    const concept = card.ai_image_prompt || card.back.slice(0, 200);
    return [
        `Educational flash card illustration for: "${card.front}".`,
        `Style: clean modern educational diagram on a dark purple background.`,
        `Visual concept: ${concept}.`,
        `Include the text label "${card.front}" prominently embedded in the image.`,
        `Keywords to visually represent: ${card.keywords.join(', ')}.`,
        `No borders, no card frame. Flat illustration or infographic style.`,
        `Square format 1:1, high contrast, suitable for study purposes.`,
    ].join(' ');
}
