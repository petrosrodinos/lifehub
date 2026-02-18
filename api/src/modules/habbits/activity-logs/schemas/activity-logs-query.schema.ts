import { z } from 'zod'

const stringBool = z
  .string()
  .optional()
  .transform((value) => {
    if (value === undefined) {
      return undefined
    }
    if (value === 'true') {
      return true
    }
    if (value === 'false') {
      return false
    }
    return undefined
  })

export const ActivityLogsQuerySchema = z.object({
  activity_uuid: z.string().uuid().optional(),
  schedule_uuid: z.string().uuid().optional(),
  from_date: z.coerce.date().optional(),
  to_date: z.coerce.date().optional(),
  completed: stringBool,
  skipped: stringBool,
})

export type ActivityLogsQueryType = z.infer<typeof ActivityLogsQuerySchema>
