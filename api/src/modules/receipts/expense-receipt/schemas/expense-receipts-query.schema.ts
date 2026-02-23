import { z } from 'zod';

export const ExpenseReceiptsQuerySchema = z.object({
    store_uuid: z.string().uuid().optional(),
    date_from: z.coerce.date().optional(),
    date_to: z.coerce.date().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
});

export type ExpenseReceiptsQueryType = z.infer<typeof ExpenseReceiptsQuerySchema>;
