import { PartialType } from '@nestjs/swagger';
import { CreateProductPurchaseDto } from './create-product-purchase.dto';

/**
 * expense_entry_uuid, create_expense and from_account_uuid are intentionally ignored on update by
 * the service — those are creation-time-only linking fields. purchase_price/purchase_date ARE
 * editable; when the purchase is linked to an expense, the service also updates that expense so
 * the two never diverge.
 */
export class UpdateProductPurchaseDto extends PartialType(CreateProductPurchaseDto) {}
