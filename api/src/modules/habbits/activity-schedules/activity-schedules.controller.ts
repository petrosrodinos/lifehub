import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivitySchedulesService } from './activity-schedules.service';
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';

@Controller('activity-schedules')
export class ActivitySchedulesController {
  constructor(private readonly activitySchedulesService: ActivitySchedulesService) {}

  @Post()
  create(@Body() createActivityScheduleDto: CreateActivityScheduleDto) {
    return this.activitySchedulesService.create(createActivityScheduleDto);
  }

  @Get()
  findAll() {
    return this.activitySchedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitySchedulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityScheduleDto: UpdateActivityScheduleDto) {
    return this.activitySchedulesService.update(+id, updateActivityScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitySchedulesService.remove(+id);
  }
}
