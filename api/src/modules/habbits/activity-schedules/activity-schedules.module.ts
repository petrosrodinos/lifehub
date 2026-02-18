import { Module } from '@nestjs/common'
import { ActivitySchedulesService } from './activity-schedules.service'
import { ActivitySchedulesController } from './activity-schedules.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'
import { SchedulesRepository } from '../repositories/schedules.repository'

@Module({
  imports: [PrismaModule],
  controllers: [ActivitySchedulesController],
  providers: [ActivitySchedulesService, SchedulesRepository],
  exports: [ActivitySchedulesService],
})
export class ActivitySchedulesModule { }
