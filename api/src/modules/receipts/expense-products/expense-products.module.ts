import { Module } from '@nestjs/common';
import { ExpenseProductsService } from './expense-products.service';
import { ExpenseProductsController } from './expense-products.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseProductsController],
  providers: [ExpenseProductsService],
})
export class ExpenseProductsModule { }
