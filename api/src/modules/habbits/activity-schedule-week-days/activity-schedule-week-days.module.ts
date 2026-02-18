import { Module } from '@nestjs/common';
import { ActivityScheduleWeekDaysService } from './activity-schedule-week-days.service';
import { ActivityScheduleWeekDaysController } from './activity-schedule-week-days.controller';

@Module({
  controllers: [ActivityScheduleWeekDaysController],
  providers: [ActivityScheduleWeekDaysService],
})
export class ActivityScheduleWeekDaysModule {}
