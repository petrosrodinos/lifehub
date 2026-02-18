import { Injectable } from '@nestjs/common';
import { CreateActivityScheduleWeekDayDto } from './dto/create-activity-schedule-week-day.dto';
import { UpdateActivityScheduleWeekDayDto } from './dto/update-activity-schedule-week-day.dto';

@Injectable()
export class ActivityScheduleWeekDaysService {
  create(createActivityScheduleWeekDayDto: CreateActivityScheduleWeekDayDto) {
    return 'This action adds a new activityScheduleWeekDay';
  }

  findAll() {
    return `This action returns all activityScheduleWeekDays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityScheduleWeekDay`;
  }

  update(id: number, updateActivityScheduleWeekDayDto: UpdateActivityScheduleWeekDayDto) {
    return `This action updates a #${id} activityScheduleWeekDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityScheduleWeekDay`;
  }
}
