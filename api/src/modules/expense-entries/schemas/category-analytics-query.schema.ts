import { z } from 'zod';
import { ExpenseEntryType } from '@/generated/prisma';

export const CategoryAnalyticsQuerySchema = z.object({
  type: z.nativeEnum(ExpenseEntryType).optional(),
  from_date: z.string().optional().transform((val) => val && val.length > 0 ? new Date(val) : undefined),
  to_date: z.string().optional().transform((val) => val && val.length > 0 ? new Date(val) : undefined),
});

export type CategoryAnalyticsQueryType = z.infer<typeof CategoryAnalyticsQuerySchema>;

export const TransactionTrendQuerySchema = z.object({
  type: z.nativeEnum(ExpenseEntryType),
  category_uuid: z.string().uuid(),
  subcategory_uuid: z.string().uuid().optional(),
  from_date: z.string().optional().transform((val) => val && val.length > 0 ? new Date(val) : undefined),
  to_date: z.string().optional().transform((val) => val && val.length > 0 ? new Date(val) : undefined),
});

export type TransactionTrendQueryType = z.infer<typeof TransactionTrendQuerySchema>;
