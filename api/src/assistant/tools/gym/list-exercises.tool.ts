import { tool } from '@openai/agents';
import { z } from 'zod';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListExercisesTool(
    gymRetrieval: GymRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_exercises',
        description: 'List all exercises available to the user, optionally filtered by muscle group name. Use when exercise names need disambiguation or the user asks what exercises they have.',
        parameters: z.object({
            muscle_group_name: z.string().nullable().optional().describe('Muscle group name to filter by, e.g. Chest'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ muscle_group_name }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { exercises: [], error: 'Missing user context' };
            }

            return gymRetrieval.listExercises(context.user_uuid, {
                muscle_group_name: muscle_group_name ?? undefined,
            });
        },
    });
}
