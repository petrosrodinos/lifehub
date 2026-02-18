import { Module } from '@nestjs/common';
import { ExpenseAccountsService } from './expense-accounts.service';
import { ExpenseAccountsController } from './expense-accounts.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseAccountsController],
  providers: [ExpenseAccountsService],
})
export class ExpenseAccountsModule { }
