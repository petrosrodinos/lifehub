import { Module } from '@nestjs/common'
import { ActivitiesService } from './services/activities.service'
import { ScheduleSlotsService } from './services/schedule-slots.service'
import { ActivitiesController } from './controllers/activities.controller'
import { ScheduleSlotsController } from './controllers/schedule-slots.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'
import { AnalyticsModule } from '@/modules/habbits/analytics/analytics.module'

@Module({
  imports: [PrismaModule, AnalyticsModule],
  controllers: [ActivitiesController, ScheduleSlotsController],
  providers: [ActivitiesService, ScheduleSlotsService],
  exports: [ActivitiesService, ScheduleSlotsService],
})
export class RoutineModule {}
