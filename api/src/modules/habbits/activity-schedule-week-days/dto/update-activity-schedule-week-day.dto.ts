import { PartialType } from '@nestjs/swagger';
import { CreateActivityScheduleWeekDayDto } from './create-activity-schedule-week-day.dto';

export class UpdateActivityScheduleWeekDayDto extends PartialType(CreateActivityScheduleWeekDayDto) {}
