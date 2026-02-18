import { Injectable } from '@nestjs/common';
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';

@Injectable()
export class ActivitySchedulesService {
  create(createActivityScheduleDto: CreateActivityScheduleDto) {
    return 'This action adds a new activitySchedule';
  }

  findAll() {
    return `This action returns all activitySchedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activitySchedule`;
  }

  update(id: number, updateActivityScheduleDto: UpdateActivityScheduleDto) {
    return `This action updates a #${id} activitySchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} activitySchedule`;
  }
}
