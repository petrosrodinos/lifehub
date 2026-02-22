import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivityScheduleWeekDaysService } from './activity-schedule-week-days.service';
import { CreateActivityScheduleWeekDayDto } from './dto/create-activity-schedule-week-day.dto';
import { UpdateActivityScheduleWeekDayDto } from './dto/update-activity-schedule-week-day.dto';

@ApiTags('Activity Schedule Weekdays')
@Controller('activity-schedule-week-days')
export class ActivityScheduleWeekDaysController {
  constructor(private readonly activityScheduleWeekDaysService: ActivityScheduleWeekDaysService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new activity schedule weekday' })
  @ApiResponse({ status: 201, description: 'Schedule weekday created successfully' })
  create(@Body() createActivityScheduleWeekDayDto: CreateActivityScheduleWeekDayDto) {
    return this.activityScheduleWeekDaysService.create(createActivityScheduleWeekDayDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity schedule weekdays' })
  @ApiResponse({ status: 200, description: 'Schedule weekdays retrieved successfully' })
  findAll() {
    return this.activityScheduleWeekDaysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific activity schedule weekday' })
  @ApiResponse({ status: 200, description: 'Schedule weekday retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.activityScheduleWeekDaysService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an activity schedule weekday' })
  @ApiResponse({ status: 200, description: 'Schedule weekday updated successfully' })
  update(@Param('id') id: string, @Body() updateActivityScheduleWeekDayDto: UpdateActivityScheduleWeekDayDto) {
    return this.activityScheduleWeekDaysService.update(+id, updateActivityScheduleWeekDayDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity schedule weekday' })
  @ApiResponse({ status: 200, description: 'Schedule weekday deleted successfully' })
  remove(@Param('id') id: string) {
    return this.activityScheduleWeekDaysService.remove(+id);
  }
}
