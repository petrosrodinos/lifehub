import { PartialType } from '@nestjs/swagger';
import { CreateProductPurchaseDto } from './create-product-purchase.dto';

/**
 * purchase_price, purchase_date, expense_entry_uuid, create_expense and from_account_uuid are
 * intentionally ignored on update by the service — those are creation-time-only snapshot/linking
 * fields, not editable afterward.
 */
export class UpdateProductPurchaseDto extends PartialType(CreateProductPurchaseDto) {}
