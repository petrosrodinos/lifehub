import { stripMarkdownImages } from './strip-markdown-images.utils';

export function stripMarkdownForSpeech(text: string): string {
    let result = stripMarkdownImages(text);

    result = result.replace(/\[([^\]]*)\]\([^)]+\)/g, '$1');
    result = result.replace(/```[a-zA-Z0-9]*\n?/g, '').replace(/```/g, '');
    result = result.replace(/`([^`]+)`/g, '$1');
    result = result.replace(/^#{1,6}\s+/gm, '');
    result = result.replace(/\*\*([^*]+)\*\*/g, '$1');
    result = result.replace(/__([^_]+)__/g, '$1');
    result = result.replace(/\*([^*]+)\*/g, '$1');
    result = result.replace(/_([^_]+)_/g, '$1');
    result = result.replace(/^>\s?/gm, '');
    result = result.replace(/^[-*+]\s+/gm, '');
    result = result.replace(/^\d+\.\s+/gm, '');
    result = result.replace(/^(-{3,}|\*{3,})$/gm, '');

    return result.replace(/\n{3,}/g, '\n\n').trim();
}
