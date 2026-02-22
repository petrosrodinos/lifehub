import { Module } from '@nestjs/common';
import { ExpenseStoreService } from './expense-store.service';
import { ExpenseStoreController } from './expense-store.controller';

@Module({
  controllers: [ExpenseStoreController],
  providers: [ExpenseStoreService],
})
export class ExpenseStoreModule {}
