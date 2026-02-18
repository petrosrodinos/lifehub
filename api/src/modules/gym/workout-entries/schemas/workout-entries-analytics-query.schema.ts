import { z } from 'zod'

export const WorkoutEntriesAnalyticsQuerySchema = z.object({
  exercise_uuid: z.string().uuid(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
})

export type WorkoutEntriesAnalyticsQueryType = z.infer<typeof WorkoutEntriesAnalyticsQuerySchema>
