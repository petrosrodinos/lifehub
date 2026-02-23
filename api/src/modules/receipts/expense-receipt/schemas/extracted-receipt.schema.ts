import { z } from 'zod';

export const ExtractedReceiptItemSchema = z.object({
  product_name: z.string().min(1),
  quantity: z.number().positive(),
  unit_price: z.number().nonnegative(),
  total_price: z.number().nonnegative(),
  category_name: z.string().optional(),
  subcategory_name: z.string().optional(),
});

export const ExtractedReceiptSchema = z.object({
  store_name: z.string().min(1),
  total_amount: z.number().nonnegative(),
  items: z.array(ExtractedReceiptItemSchema).min(1),
  receipt_date: z.string().optional(),
});

export type ExtractedReceiptItem = z.infer<typeof ExtractedReceiptItemSchema>;
export type ExtractedReceipt = z.infer<typeof ExtractedReceiptSchema>;
