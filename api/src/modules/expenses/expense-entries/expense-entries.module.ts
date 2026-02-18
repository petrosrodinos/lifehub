import { Module } from '@nestjs/common';
import { ExpenseEntriesService } from './expense-entries.service';
import { ExpenseEntriesController } from './expense-entries.controller';
import { PrismaModule } from '../../../core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseEntriesController],
  providers: [ExpenseEntriesService],
})
export class ExpenseEntriesModule { }
