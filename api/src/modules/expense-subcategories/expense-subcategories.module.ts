import { Module } from '@nestjs/common';
import { ExpenseSubcategoriesService } from './expense-subcategories.service';
import { ExpenseSubcategoriesController } from './expense-subcategories.controller';
import { PrismaModule } from '../../core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseSubcategoriesController],
  providers: [ExpenseSubcategoriesService],
})
export class ExpenseSubcategoriesModule {}
