const MARKDOWN_IMAGE_PATTERN = /!\[[^\]]*\]\([^)]+\)/g;

export function stripMarkdownImages(text: string, imageUrls: string[] = []): string {
    let result = text.replace(MARKDOWN_IMAGE_PATTERN, '');

    for (const url of imageUrls) {
        const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        result = result.replace(new RegExp(escaped, 'g'), '');
    }

    return result.replace(/\n{3,}/g, '\n\n').trim();
}
