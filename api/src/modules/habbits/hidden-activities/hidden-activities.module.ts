import { Module } from '@nestjs/common';
import { HiddenActivitiesService } from './hidden-activities.service';
import { HiddenActivitiesController } from './hidden-activities.controller';

@Module({
  controllers: [HiddenActivitiesController],
  providers: [HiddenActivitiesService],
})
export class HiddenActivitiesModule {}
