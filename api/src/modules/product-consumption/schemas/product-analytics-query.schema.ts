import { z } from 'zod';

export const ProductAnalyticsQuerySchema = z.object({
  from_date: z.coerce.date().optional(),
  to_date: z.coerce.date().optional(),
  category_uuid: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type ProductAnalyticsQueryType = z.infer<typeof ProductAnalyticsQuerySchema>;
