import { tool } from '@openai/agents';
import { z } from 'zod';
import { ChatImageService } from '@/assistant/images/chat-image.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createCreateImageTool(
    chatImageService: ChatImageService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'create_image',
        description:
            'Generate an image from a text description. Use when the user asks to create, draw, or generate a picture or illustration.',
        parameters: z.object({
            prompt: z.string().describe('Detailed description of the image to generate'),
        }),
        timeoutMs: assistantConfig.imageToolTimeoutMs,
        async execute({ prompt }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;
            if (!context?.user_uuid) {
                return { error: 'Missing user context' };
            }

            try {
                return await chatImageService.createAndUpload(context.user_uuid, prompt);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Image generation failed';
                return { error: message };
            }
        },
    });
}
