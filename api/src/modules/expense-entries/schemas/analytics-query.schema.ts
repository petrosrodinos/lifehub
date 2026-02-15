import { z } from 'zod';

export const AnalyticsQuerySchema = z.object({
  account_uuids: z.string().optional(),
  from_date: z.string().optional().transform((val) => val && val.length > 0 ? new Date(val) : undefined),
  to_date: z.string().optional().transform((val) => val && val.length > 0 ? new Date(val) : undefined),
});

export type AnalyticsQueryType = z.infer<typeof AnalyticsQuerySchema>;
