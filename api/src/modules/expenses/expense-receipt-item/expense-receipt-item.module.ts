import { Module } from '@nestjs/common';
import { ExpenseReceiptItemService } from './expense-receipt-item.service';
import { ExpenseReceiptItemController } from './expense-receipt-item.controller';

@Module({
  controllers: [ExpenseReceiptItemController],
  providers: [ExpenseReceiptItemService],
})
export class ExpenseReceiptItemModule {}
