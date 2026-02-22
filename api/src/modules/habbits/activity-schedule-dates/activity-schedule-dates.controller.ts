import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivityScheduleDatesService } from './activity-schedule-dates.service';
import { CreateActivityScheduleDateDto } from './dto/create-activity-schedule-date.dto';
import { UpdateActivityScheduleDateDto } from './dto/update-activity-schedule-date.dto';

@ApiTags('Activity Schedule Dates')
@Controller('activity-schedule-dates')
export class ActivityScheduleDatesController {
  constructor(private readonly activityScheduleDatesService: ActivityScheduleDatesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new activity schedule date' })
  @ApiResponse({ status: 201, description: 'Schedule date created successfully' })
  create(@Body() createActivityScheduleDateDto: CreateActivityScheduleDateDto) {
    return this.activityScheduleDatesService.create(createActivityScheduleDateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity schedule dates' })
  @ApiResponse({ status: 200, description: 'Schedule dates retrieved successfully' })
  findAll() {
    return this.activityScheduleDatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific activity schedule date' })
  @ApiResponse({ status: 200, description: 'Schedule date retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.activityScheduleDatesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an activity schedule date' })
  @ApiResponse({ status: 200, description: 'Schedule date updated successfully' })
  update(@Param('id') id: string, @Body() updateActivityScheduleDateDto: UpdateActivityScheduleDateDto) {
    return this.activityScheduleDatesService.update(+id, updateActivityScheduleDateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity schedule date' })
  @ApiResponse({ status: 200, description: 'Schedule date deleted successfully' })
  remove(@Param('id') id: string) {
    return this.activityScheduleDatesService.remove(+id);
  }
}
