import { Module } from '@nestjs/common';
import { ExpenseReceiptItemService } from './expense-receipt-item.service';
import { ExpenseReceiptItemController } from './expense-receipt-item.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseReceiptItemController],
  providers: [ExpenseReceiptItemService],
})
export class ExpenseReceiptItemModule { }
