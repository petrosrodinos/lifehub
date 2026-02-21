import { Module } from '@nestjs/common'
import { ActivitiesService } from './activities.service'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'
import { AnalyticsModule } from '@/modules/habbits/analytics/analytics.module'
import { ActivitiesController } from './activities.controller'
import { ScheduleSlotsController } from '../schedule-slots/schedule-slots.controller'
import { ScheduleSlotsService } from '../schedule-slots/schedule-slots.service'
import { OccurrencesRepository } from '@/modules/habbits/repositories/occurrences.repository'

@Module({
  imports: [PrismaModule, AnalyticsModule],
  controllers: [ActivitiesController, ScheduleSlotsController],
  providers: [ActivitiesService, ScheduleSlotsService, OccurrencesRepository],
  exports: [ActivitiesService, ScheduleSlotsService],
})
export class RoutineModule { }

