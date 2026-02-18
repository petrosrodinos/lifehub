import { Module } from '@nestjs/common';
import { ActivityOccurrencesService } from './activity-occurrences.service';
import { ActivityOccurrencesController } from './activity-occurrences.controller';

@Module({
  controllers: [ActivityOccurrencesController],
  providers: [ActivityOccurrencesService],
})
export class ActivityOccurrencesModule {}
