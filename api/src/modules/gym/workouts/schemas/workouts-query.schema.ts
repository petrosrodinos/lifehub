import { z } from 'zod'

export const WorkoutsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  from_date: z.coerce.date().optional(),
  to_date: z.coerce.date().optional(),
  all: z.coerce.boolean().optional().default(false),
})

export type WorkoutsQueryType = z.infer<typeof WorkoutsQuerySchema>
