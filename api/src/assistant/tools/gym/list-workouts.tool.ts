import { tool } from '@openai/agents';
import { z } from 'zod';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListWorkoutsTool(
    gymRetrieval: GymRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_workouts',
        description: 'List the user workouts with optional date range filters. Returns workout summaries including exercises, sets, and volume.',
        parameters: z.object({
            from_date: z.string().nullable().optional().describe('Start date in ISO format (YYYY-MM-DD)'),
            to_date: z.string().nullable().optional().describe('End date in ISO format (YYYY-MM-DD)'),
            limit: z.number().int().min(1).max(50).nullable().optional().describe('Maximum number of workouts to return'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ from_date, to_date, limit }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { workouts: [], total: 0, error: 'Missing user context' };
            }

            return gymRetrieval.listWorkouts(context.user_uuid, {
                from_date: from_date ?? undefined,
                to_date: to_date ?? undefined,
                limit: limit ?? undefined,
            });
        },
    });
}
