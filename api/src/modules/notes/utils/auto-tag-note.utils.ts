import { AiService } from '@/integrations/ai/services/ai.service';
import { AiProviders, AiModels } from '@/integrations/ai/interfaces/ai.interface';

export const NOTE_TAG_PRESET_COLORS = [
    '#8b5cf6',
    '#ec4899',
    '#ef4444',
    '#f59e0b',
    '#10b981',
    '#3b82f6',
    '#06b6d4',
    '#f97316',
] as const;

const CONTENT_PREVIEW_LENGTH = 800;
const MAX_TAG_TITLE_LENGTH = 30;

export type NoteTagRef = {
    uuid: string;
    title: string;
    color: string;
};

export type NoteForAutoTag = {
    title: string;
    type: string;
    content: string;
};

export type AutoTagAssignDecision = {
    action: 'assign';
    tag_uuid: string;
};

export type AutoTagCreateDecision = {
    action: 'create';
    title: string;
    color: string;
};

export type AutoTagDecision = AutoTagAssignDecision | AutoTagCreateDecision;

export function buildNoteTagsContext(tags: NoteTagRef[]): string {
    if (tags.length === 0) return '(none)';
    return tags
        .map((t) => `- uuid: "${t.uuid}", title: "${t.title}", color: "${t.color}"`)
        .join('\n');
}

export function getAvailableTagColors(tags: NoteTagRef[]): string[] {
    const used = new Set(tags.map((t) => t.color.toLowerCase()));
    return NOTE_TAG_PRESET_COLORS.filter((c) => !used.has(c.toLowerCase()));
}

export function pickUnusedTagColor(tags: NoteTagRef[], preferred?: string): string {
    const available = getAvailableTagColors(tags);
    if (preferred) {
        const match = NOTE_TAG_PRESET_COLORS.find(
            (c) => c.toLowerCase() === preferred.toLowerCase(),
        );
        if (match && available.includes(match)) return match;
    }
    if (available.length > 0) return available[0];
    const usage = new Map<string, number>();
    for (const color of NOTE_TAG_PRESET_COLORS) usage.set(color, 0);
    for (const tag of tags) {
        const preset = NOTE_TAG_PRESET_COLORS.find(
            (c) => c.toLowerCase() === tag.color.toLowerCase(),
        );
        if (preset) usage.set(preset, (usage.get(preset) ?? 0) + 1);
    }
    return [...NOTE_TAG_PRESET_COLORS].sort(
        (a, b) => (usage.get(a) ?? 0) - (usage.get(b) ?? 0),
    )[0];
}

export function normalizeCreateTagTitle(title: string): string {
    return title.slice(0, MAX_TAG_TITLE_LENGTH).trim();
}

export function normalizeCreateTagColor(
    color: string | undefined,
    existingTags: NoteTagRef[],
): string {
    const preset = new Set<string>(NOTE_TAG_PRESET_COLORS);
    const isValidHex = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value);
    const preferred =
        color && (preset.has(color) || isValidHex(color)) ? color : undefined;
    return pickUnusedTagColor(existingTags, preferred);
}

export function parseAutoTagResponse(
    raw: string,
    existingTags: NoteTagRef[],
): AutoTagDecision | null {
    const jsonMatch = raw.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) return null;

    let parsed: { action?: string; tag_uuid?: string; title?: string; color?: string };
    try {
        parsed = JSON.parse(jsonMatch[0]);
    } catch {
        return null;
    }

    if (parsed.action === 'assign' && parsed.tag_uuid) {
        return { action: 'assign', tag_uuid: parsed.tag_uuid };
    }

    if (parsed.action === 'create' && parsed.title) {
        return {
            action: 'create',
            title: normalizeCreateTagTitle(parsed.title),
            color: normalizeCreateTagColor(parsed.color, existingTags),
        };
    }

    return null;
}

export async function suggestNoteTag(
    aiService: AiService,
    note: NoteForAutoTag,
    existingTags: NoteTagRef[],
): Promise<AutoTagDecision | null> {
    const availableColors = getAvailableTagColors(existingTags);
    const colorsAlreadyUsed =
        existingTags.length > 0
            ? [...new Set(existingTags.map((t) => t.color))].join(', ')
            : '(none)';

    const { response } = await aiService.generateText({
        provider: AiProviders.openai,
        model: AiModels.openai.gpt4oMini,
        system: 'You are a note tagging assistant. You ONLY output a single raw JSON object — no markdown, no explanation, nothing else.',
        prompt: `Note title: "${note.title}"
Note type: ${note.type}
Note content (first ${CONTENT_PREVIEW_LENGTH} chars): ${note.content.slice(0, CONTENT_PREVIEW_LENGTH)}

Existing tags (uuid, title, color):
${buildNoteTagsContext(existingTags)}

Colors already used by existing tags: ${colorsAlreadyUsed}
Available colors for a NEW tag (pick exactly one — must NOT match any color already used): ${
            availableColors.length > 0
                ? availableColors.join(', ')
                : `all preset colors are taken; pick the least-used from: ${NOTE_TAG_PRESET_COLORS.join(', ')}`
        }
Full preset palette: ${NOTE_TAG_PRESET_COLORS.join(', ')}

Pick the best single tag for this note. If an existing tag fits well, assign it.
If no existing tag fits, create a new one with a distinct color from "Available colors" so it is visually different from tags that already exist.

Reply with ONLY one of:
{"action":"assign","tag_uuid":"<uuid of existing tag>"}
{"action":"create","title":"<short tag name, max 30 chars>","color":"<hex from Available colors>"}`,
        maxTokens: 100,
    });

    return parseAutoTagResponse(response, existingTags);
}
