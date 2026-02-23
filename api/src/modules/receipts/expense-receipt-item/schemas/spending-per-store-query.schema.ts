import { z } from 'zod';

export const SpendingPerStoreQuerySchema = z.object({
  from_date: z.string().datetime().optional(),
  to_date: z.string().datetime().optional(),
});

export type SpendingPerStoreQueryType = z.infer<typeof SpendingPerStoreQuerySchema>;
