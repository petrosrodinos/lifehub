import { z } from 'zod';
import { ProductPurchaseStatus, ProductTrackingMethod } from '@/generated/prisma';

export const ProductPurchasesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  product_uuid: z.string().uuid().optional(),
  status: z.nativeEnum(ProductPurchaseStatus).optional(),
  tracking_method: z.nativeEnum(ProductTrackingMethod).optional(),
  search: z.string().optional(),
});

export type ProductPurchasesQueryType = z.infer<typeof ProductPurchasesQuerySchema>;
