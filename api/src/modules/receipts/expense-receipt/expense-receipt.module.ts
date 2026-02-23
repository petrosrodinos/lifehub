import { Module } from '@nestjs/common';
import { ExpenseReceiptService } from './expense-receipt.service';
import { ExpenseReceiptController } from './expense-receipt.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiHelperModule } from '@/shared/services/ai/ai.module';

@Module({
  imports: [PrismaModule, AiHelperModule],
  controllers: [ExpenseReceiptController],
  providers: [ExpenseReceiptService],
})
export class ExpenseReceiptModule { }
