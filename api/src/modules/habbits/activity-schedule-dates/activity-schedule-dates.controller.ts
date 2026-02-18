import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityScheduleDatesService } from './activity-schedule-dates.service';
import { CreateActivityScheduleDateDto } from './dto/create-activity-schedule-date.dto';
import { UpdateActivityScheduleDateDto } from './dto/update-activity-schedule-date.dto';

@Controller('activity-schedule-dates')
export class ActivityScheduleDatesController {
  constructor(private readonly activityScheduleDatesService: ActivityScheduleDatesService) {}

  @Post()
  create(@Body() createActivityScheduleDateDto: CreateActivityScheduleDateDto) {
    return this.activityScheduleDatesService.create(createActivityScheduleDateDto);
  }

  @Get()
  findAll() {
    return this.activityScheduleDatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityScheduleDatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityScheduleDateDto: UpdateActivityScheduleDateDto) {
    return this.activityScheduleDatesService.update(+id, updateActivityScheduleDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityScheduleDatesService.remove(+id);
  }
}
