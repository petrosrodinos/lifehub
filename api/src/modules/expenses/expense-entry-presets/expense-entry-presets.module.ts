import { Module } from '@nestjs/common';
import { ExpenseEntryPresetsService } from './expense-entry-presets.service';
import { ExpenseEntryPresetsController } from './expense-entry-presets.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseEntryPresetsController],
  providers: [ExpenseEntryPresetsService],
})
export class ExpenseEntryPresetsModule {}
