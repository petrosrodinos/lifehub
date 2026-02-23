import { z } from 'zod';

export const ExpenseReceiptsQuerySchema = z.object({
    store_uuid: z.string().uuid().optional(),
});

export type ExpenseReceiptsQueryType = z.infer<typeof ExpenseReceiptsQuerySchema>;
