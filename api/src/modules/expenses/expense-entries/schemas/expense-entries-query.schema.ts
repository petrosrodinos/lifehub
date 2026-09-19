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
  account_uuids: z.string().optional(),
  from_date: z.coerce.date().optional(),
  to_date: z.coerce.date().optional(),
  search: z.string().optional(),
  tag_uuid: z.string().uuid().optional(),
  has_vat: z.enum(['true', 'false']).optional().transform((val) => (val === undefined ? undefined : val === 'true')),
  vat_period_year: z.coerce.number().int().min(2000).max(2100).optional(),
  vat_period_month: z.coerce.number().int().min(1).max(12).optional(),
});

export type ExpenseEntriesQueryType = z.infer<typeof ExpenseEntriesQuerySchema>;
