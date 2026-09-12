import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExerciseType } from '@/generated/prisma';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

const workoutSetSchema = z.object({
    type: z.nativeEnum(ExerciseType).nullable().optional().describe('REPS or TIME; defaults to REPS'),
    reps: z.number().int().min(0).nullable().optional(),
    weight: z.number().min(0).nullable().optional().describe('Weight used for this set'),
    duration_seconds: z.number().int().min(0).nullable().optional(),
    distance_meters: z.number().int().min(0).nullable().optional(),
    rest_seconds: z.number().int().min(0).nullable().optional(),
    notes: z.string().nullable().optional(),
    is_warmup: z.boolean().nullable().optional(),
    is_cooldown: z.boolean().nullable().optional(),
    is_rest: z.boolean().nullable().optional(),
    is_dropset: z.boolean().nullable().optional(),
    is_amrap: z.boolean().nullable().optional(),
    is_super_set: z.boolean().nullable().optional(),
});

const workoutExerciseSchema = z.object({
    exercise_name: z.string().describe('Exercise name, e.g. Bench Press'),
    sets: z.array(workoutSetSchema).describe('Sets performed for this exercise, in order'),
});

export function createCreateWorkoutTool(
    gymRetrieval: GymRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'create_workout',
        description: 'Create and log a new workout session for the user, optionally with its exercises and sets. Use only when the user explicitly asks to log, record, or add a workout.',
        parameters: z.object({
            name: z.string().nullable().optional().describe('Workout name, e.g. Push Day'),
            notes: z.string().nullable().optional(),
            started_at: z.string().nullable().optional().describe('ISO datetime the workout started; defaults to now'),
            finished_at: z.string().nullable().optional().describe('ISO datetime the workout finished'),
            exercises: z.array(workoutExerciseSchema).nullable().optional().describe('Exercises performed in this workout, in order'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ name, notes, started_at, finished_at, exercises }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { error: 'Missing user context' };
            }

            return gymRetrieval.createWorkout(context.user_uuid, {
                name: name ?? undefined,
                notes: notes ?? undefined,
                started_at: started_at ?? undefined,
                finished_at: finished_at ?? undefined,
                exercises: exercises?.map((exercise) => ({
                    exercise_name: exercise.exercise_name,
                    sets: exercise.sets.map((set) => ({
                        type: set.type ?? undefined,
                        reps: set.reps ?? undefined,
                        weight: set.weight ?? undefined,
                        duration_seconds: set.duration_seconds ?? undefined,
                        distance_meters: set.distance_meters ?? undefined,
                        rest_seconds: set.rest_seconds ?? undefined,
                        notes: set.notes ?? undefined,
                        is_warmup: set.is_warmup ?? undefined,
                        is_cooldown: set.is_cooldown ?? undefined,
                        is_rest: set.is_rest ?? undefined,
                        is_dropset: set.is_dropset ?? undefined,
                        is_amrap: set.is_amrap ?? undefined,
                        is_super_set: set.is_super_set ?? undefined,
                    })),
                })) ?? undefined,
            });
        },
    });
}
