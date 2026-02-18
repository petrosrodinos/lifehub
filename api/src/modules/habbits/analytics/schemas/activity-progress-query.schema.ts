import { z } from 'zod'

export const ActivityProgressQuerySchema = z.object({
  range: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
})

export type ActivityProgressQueryType = z.infer<typeof ActivityProgressQuerySchema>
