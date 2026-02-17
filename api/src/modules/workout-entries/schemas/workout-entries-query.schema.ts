import { z } from 'zod'

export const WorkoutEntriesQuerySchema = z.object({
  exercise_uuid: z.string().uuid().optional(),
  workout_uuid: z.string().uuid().optional(),
})

export type WorkoutEntriesQueryType = z.infer<typeof WorkoutEntriesQuerySchema>
