import { tool } from '@openai/agents';
import { z } from 'zod';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListMuscleGroupsTool(
    gymRetrieval: GymRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_muscle_groups',
        description: 'List all muscle groups available to the user. Use when muscle group names need disambiguation or the user asks about muscle groups.',
        parameters: z.object({}),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute(_args, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { muscle_groups: [], error: 'Missing user context' };
            }

            const muscleGroups = await gymRetrieval.listMuscleGroups(context.user_uuid);

            return { muscle_groups: muscleGroups };
        },
    });
}
