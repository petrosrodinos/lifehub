import { Module } from '@nestjs/common';
import { ExpenseReceiptService } from './expense-receipt.service';
import { ExpenseReceiptController } from './expense-receipt.controller';

@Module({
  controllers: [ExpenseReceiptController],
  providers: [ExpenseReceiptService],
})
export class ExpenseReceiptModule {}
