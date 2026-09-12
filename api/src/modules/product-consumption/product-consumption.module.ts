import { Module } from '@nestjs/common';
import { ProductConsumptionService } from './product-consumption.service';
import { ProductConsumptionController } from './product-consumption.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { ExpenseEntriesModule } from '../expenses/expense-entries/expense-entries.module';

@Module({
  imports: [PrismaModule, ExpenseEntriesModule],
  controllers: [ProductConsumptionController],
  providers: [ProductConsumptionService],
  exports: [ProductConsumptionService],
})
export class ProductConsumptionModule { }
