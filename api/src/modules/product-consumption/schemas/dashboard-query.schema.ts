import { z } from 'zod';

export const DashboardQuerySchema = z.object({
  finishing_soon_days: z.coerce.number().int().positive().max(365).default(14),
});

export type DashboardQueryType = z.infer<typeof DashboardQuerySchema>;
