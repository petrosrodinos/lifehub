import type { RunItem } from '@openai/agents';
import { AssistantGeneratedImage } from '../interfaces/assistant-run.interface';

interface CreateImageToolOutput {
    url?: string;
    prompt?: string;
    error?: string;
}

export function extractGeneratedImages(newItems: RunItem[]): AssistantGeneratedImage[] {
    const images: AssistantGeneratedImage[] = [];
    let lastToolName: string | undefined;

    for (const item of newItems) {
        if (item.type === 'tool_call_item') {
            const raw = item.rawItem as { name?: string };
            lastToolName = raw?.name;
        }

        if (item.type === 'tool_call_output_item' && lastToolName === 'create_image') {
            const output = item.output as CreateImageToolOutput | string | undefined;
            const parsed = typeof output === 'string' ? parseCreateImageOutput(output) : output;

            if (parsed?.url && parsed.prompt && !parsed.error) {
                images.push({ url: parsed.url, prompt: parsed.prompt });
            }

            lastToolName = undefined;
        }
    }

    return images;
}

function parseCreateImageOutput(value: string): CreateImageToolOutput | undefined {
    try {
        return JSON.parse(value) as CreateImageToolOutput;
    } catch {
        return undefined;
    }
}
