import { z } from 'zod';
import { ExpenseEntryType } from '@/generated/prisma';

export const ExpenseEntriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  type: z.nativeEnum(ExpenseEntryType).optional(),
  category_uuid: z.string().uuid().optional(),
  subcategory_uuid: z.string().uuid().optional(),
  from_account_uuid: z.string().uuid().optional(),
  to_account_uuid: z.string().uuid().optional(),
  from_date: z.coerce.date().optional(),
  to_date: z.coerce.date().optional(),
  search: z.string().optional(),
});

export type ExpenseEntriesQueryType = z.infer<typeof ExpenseEntriesQuerySchema>;
