import { Module } from '@nestjs/common';
import { ExpenseEntryPresetsService } from './expense-entry-presets.service';
import { ExpenseEntryPresetsController } from './expense-entry-presets.controller';
import { ExpensePresetRecurrenceJobsService } from './expense-preset-recurrence-jobs.service';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { ExpenseEntriesModule } from '../expense-entries/expense-entries.module';

@Module({
  imports: [PrismaModule, ExpenseEntriesModule],
  controllers: [ExpenseEntryPresetsController],
  providers: [ExpenseEntryPresetsService, ExpensePresetRecurrenceJobsService],
})
export class ExpenseEntryPresetsModule {}
