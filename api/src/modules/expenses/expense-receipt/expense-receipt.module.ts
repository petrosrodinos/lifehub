import { Module } from '@nestjs/common';
import { ExpenseReceiptService } from './expense-receipt.service';
import { ExpenseReceiptController } from './expense-receipt.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseReceiptController],
  providers: [ExpenseReceiptService],
})
export class ExpenseReceiptModule { }
