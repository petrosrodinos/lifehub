import { Module } from '@nestjs/common';
import { ExpenseStoreService } from './expense-store.service';
import { ExpenseStoreController } from './expense-store.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseStoreController],
  providers: [ExpenseStoreService],
})
export class ExpenseStoreModule { }
