import { Injectable } from '@nestjs/common';
import { CreateActivityScheduleDateDto } from './dto/create-activity-schedule-date.dto';
import { UpdateActivityScheduleDateDto } from './dto/update-activity-schedule-date.dto';

@Injectable()
export class ActivityScheduleDatesService {
  create(createActivityScheduleDateDto: CreateActivityScheduleDateDto) {
    return 'This action adds a new activityScheduleDate';
  }

  findAll() {
    return `This action returns all activityScheduleDates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityScheduleDate`;
  }

  update(id: number, updateActivityScheduleDateDto: UpdateActivityScheduleDateDto) {
    return `This action updates a #${id} activityScheduleDate`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityScheduleDate`;
  }
}
