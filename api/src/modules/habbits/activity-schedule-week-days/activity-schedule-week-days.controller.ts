import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityScheduleWeekDaysService } from './activity-schedule-week-days.service';
import { CreateActivityScheduleWeekDayDto } from './dto/create-activity-schedule-week-day.dto';
import { UpdateActivityScheduleWeekDayDto } from './dto/update-activity-schedule-week-day.dto';

@Controller('activity-schedule-week-days')
export class ActivityScheduleWeekDaysController {
  constructor(private readonly activityScheduleWeekDaysService: ActivityScheduleWeekDaysService) {}

  @Post()
  create(@Body() createActivityScheduleWeekDayDto: CreateActivityScheduleWeekDayDto) {
    return this.activityScheduleWeekDaysService.create(createActivityScheduleWeekDayDto);
  }

  @Get()
  findAll() {
    return this.activityScheduleWeekDaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityScheduleWeekDaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityScheduleWeekDayDto: UpdateActivityScheduleWeekDayDto) {
    return this.activityScheduleWeekDaysService.update(+id, updateActivityScheduleWeekDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityScheduleWeekDaysService.remove(+id);
  }
}
