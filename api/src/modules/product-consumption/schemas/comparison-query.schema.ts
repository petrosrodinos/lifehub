import { z } from 'zod';

export const ComparisonQuerySchema = z
  .object({
    product_uuids: z.string().min(1),
  })
  .transform((data) => ({
    product_uuids: data.product_uuids
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  }))
  .refine((data) => data.product_uuids.length >= 2, {
    message: 'At least 2 product_uuids are required for comparison',
    path: ['product_uuids'],
  });

export type ComparisonQueryType = z.infer<typeof ComparisonQuerySchema>;
