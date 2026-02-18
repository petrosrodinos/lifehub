import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { ScheduleSlotsService } from './schedule-slots.service';
import { ScheduleSlotsController } from './schedule-slots.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleSlotsController],
  providers: [ScheduleSlotsService],
})
export class ScheduleSlotsModule {}
