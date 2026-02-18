import { Module } from '@nestjs/common';
import { ActivityScheduleDatesService } from './activity-schedule-dates.service';
import { ActivityScheduleDatesController } from './activity-schedule-dates.controller';

@Module({
  controllers: [ActivityScheduleDatesController],
  providers: [ActivityScheduleDatesService],
})
export class ActivityScheduleDatesModule {}
