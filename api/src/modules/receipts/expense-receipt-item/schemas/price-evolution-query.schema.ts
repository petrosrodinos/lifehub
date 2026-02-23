import { z } from 'zod';

export const PriceEvolutionQuerySchema = z.object({
    product_uuid: z.string().uuid(),
    from_date: z.string().datetime().optional(),
    to_date: z.string().datetime().optional(),
});

export type PriceEvolutionQueryType = z.infer<typeof PriceEvolutionQuerySchema>;
