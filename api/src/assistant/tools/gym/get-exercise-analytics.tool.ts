import { tool } from '@openai/agents';
import { z } from 'zod';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createGetExerciseAnalyticsTool(
    gymRetrieval: GymRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'get_exercise_analytics',
        description: 'Get progress statistics for a specific exercise over time, including max weight, reps, volume, and sets per session. Use when the user asks about PRs, progress, or performance on a lift.',
        parameters: z.object({
            exercise_name: z.string().describe('Exercise name, e.g. Bench Press'),
            start_date: z.string().nullable().optional().describe('Start date in ISO format (YYYY-MM-DD)'),
            end_date: z.string().nullable().optional().describe('End date in ISO format (YYYY-MM-DD)'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ exercise_name, start_date, end_date }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { error: 'Missing user context' };
            }

            return gymRetrieval.getExerciseAnalytics(context.user_uuid, {
                exercise_name,
                start_date: start_date ?? undefined,
                end_date: end_date ?? undefined,
            });
        },
    });
}
