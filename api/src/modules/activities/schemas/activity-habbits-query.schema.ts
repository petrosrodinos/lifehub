import { z } from 'zod'
import { OccurrenceStatus } from '@/generated/prisma'

const occurrenceStatusValues = Object.values(OccurrenceStatus) as [OccurrenceStatus, ...OccurrenceStatus[]]

export const ActivityHabbitsQuerySchema = z.object({
  date_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date_from must be in YYYY-MM-DD format')
    .optional(),
  date_to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date_to must be in YYYY-MM-DD format')
    .optional(),
  activity_uuid: z.string().uuid('activity_uuid must be a valid UUID').optional(),
  status: z.enum(occurrenceStatusValues, { message: 'status must be a valid OccurrenceStatus' }).optional(),
})

export type ActivityHabbitsQueryType = z.infer<typeof ActivityHabbitsQuerySchema>
