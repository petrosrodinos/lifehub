import { Module } from '@nestjs/common';
import { ExpenseTagsService } from './expense-tags.service';
import { ExpenseTagsController } from './expense-tags.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseTagsController],
  providers: [ExpenseTagsService],
})
export class ExpenseTagsModule {}
