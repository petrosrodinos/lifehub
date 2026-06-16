import { tool } from '@openai/agents';
import { z } from 'zod';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListWorkoutEntriesTool(
    gymRetrieval: GymRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_workout_entries',
        description: 'List detailed workout entries with individual sets, reps, and weights. Use when the user asks about specific sets, reps, or detailed performance data.',
        parameters: z.object({
            exercise_name: z.string().nullable().optional().describe('Exercise name to filter by'),
            workout_uuid: z.string().nullable().optional().describe('Workout UUID to filter by'),
            limit: z.number().int().min(1).max(50).nullable().optional().describe('Maximum number of entries to return'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ exercise_name, workout_uuid, limit }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { entries: [], total: 0, error: 'Missing user context' };
            }

            return gymRetrieval.listWorkoutEntries(context.user_uuid, {
                exercise_name: exercise_name ?? undefined,
                workout_uuid: workout_uuid ?? undefined,
                limit: limit ?? undefined,
            });
        },
    });
}
