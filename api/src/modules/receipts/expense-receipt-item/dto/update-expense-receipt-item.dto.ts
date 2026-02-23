import { PartialType } from '@nestjs/swagger';
import { CreateExpenseReceiptItemDto } from './create-expense-receipt-item.dto';

export class UpdateExpenseReceiptItemDto extends PartialType(CreateExpenseReceiptItemDto) {}
