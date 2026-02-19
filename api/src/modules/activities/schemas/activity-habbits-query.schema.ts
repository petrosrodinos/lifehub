import { z } from 'zod'

export const ActivityHabbitsQuerySchema = z.object({
  date_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date_from must be in YYYY-MM-DD format')
    .optional(),
  date_to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date_to must be in YYYY-MM-DD format')
    .optional(),
})

export type ActivityHabbitsQueryType = z.infer<typeof ActivityHabbitsQuerySchema>
