import { PartialType } from '@nestjs/swagger';
import { CreateExpenseReceiptDto } from './create-expense-receipt.dto';

export class UpdateExpenseReceiptDto extends PartialType(CreateExpenseReceiptDto) {}
