import { Injectable } from "@nestjs/common";
import { GetReceiptDataOptions } from "./ai.interfaces";
import { ExtractedReceipt, ExtractedReceiptSchema } from "@/modules/receipts/expense-receipt/schemas/extracted-receipt.schema";
import { AiService } from "@/integrations/ai/services/ai.service";

@Injectable()
export class AiHelperService {


    constructor(private readonly aiService: AiService) { }

    async getReceiptData(options: GetReceiptDataOptions) {

        const { categoryNames, subcategoriesContext, storeNames, productNames, imageBuffer, mimeType } = options;

        const systemPrompt = `You are a receipt parser. Extract structured data from the receipt image.
        Use these existing options when they match; otherwise provide new names:
        Categories: ${categoryNames || 'none'}
        Subcategories (category > subcategory): ${subcategoriesContext || 'none'}
        Stores: ${storeNames || 'none'}
        Products: ${productNames || 'none'}
        If something does not match the list, use a sensible new name.`;

        const prompt = `Extract the store name, total amount, and each line item (product name, quantity, unit price, total price). For each item assign category_name and subcategory_name when possible using the provided lists or new names. Return receipt_date as ISO date string if visible.`;

        const { response: extracted } = await this.aiService.extractObjectFromImage<ExtractedReceipt>({
            image: imageBuffer,
            mimeType,
            system: systemPrompt,
            prompt,
            schema: ExtractedReceiptSchema,
        });

        const receiptDate = extracted.receipt_date
            ? new Date(extracted.receipt_date)
            : new Date();

        return {
            receiptDate,
            extracted,
        };
    }
}