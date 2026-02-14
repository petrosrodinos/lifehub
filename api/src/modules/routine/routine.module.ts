import { Module } from '@nestjs/common'
import { ActivitiesService } from './services/activities.service'
import { ScheduleSlotsService } from './services/schedule-slots.service'
import { ActivitiesController } from './controllers/activities.controller'
import { ScheduleSlotsController } from './controllers/schedule-slots.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [ActivitiesController, ScheduleSlotsController],
  providers: [ActivitiesService, ScheduleSlotsService],
  exports: [ActivitiesService, ScheduleSlotsService],
})
export class RoutineModule {}
