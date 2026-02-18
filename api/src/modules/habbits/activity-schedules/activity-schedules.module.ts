import { Module } from '@nestjs/common';
import { ActivitySchedulesService } from './activity-schedules.service';
import { ActivitySchedulesController } from './activity-schedules.controller';

@Module({
  controllers: [ActivitySchedulesController],
  providers: [ActivitySchedulesService],
})
export class ActivitySchedulesModule {}
