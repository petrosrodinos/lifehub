import { z } from 'zod';

export const PurchasedProductsQuerySchema = z.object({
    store_uuid: z.string().uuid().optional(),
    from_date: z.string().datetime().optional(),
    to_date: z.string().datetime().optional(),
});

export type PurchasedProductsQueryType = z.infer<typeof PurchasedProductsQuerySchema>;
