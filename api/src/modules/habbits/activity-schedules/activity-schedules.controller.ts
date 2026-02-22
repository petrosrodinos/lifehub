import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { ActivitySchedulesService } from './activity-schedules.service'
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto'
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'

@ApiTags('Activity Schedules')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtGuard)
export class ActivitySchedulesController {
  constructor(private readonly activitySchedulesService: ActivitySchedulesService) { }

  @Post('activities/:activity_uuid/schedules')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new schedule for an activity' })
  @ApiParam({ name: 'activity_uuid', description: 'Activity UUID' })
  @ApiResponse({ status: 201, description: 'Activity schedule created successfully' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('activity_uuid') activity_uuid: string,
    @Body() createActivityScheduleDto: CreateActivityScheduleDto,
  ) {
    return this.activitySchedulesService.createForActivity(user_uuid, activity_uuid, createActivityScheduleDto)
  }

  @Get('schedules')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all schedules for the current user' })
  @ApiResponse({ status: 200, description: 'Schedules retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.activitySchedulesService.findAll(user_uuid)
  }

  @Get('schedules/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific schedule by UUID' })
  @ApiParam({ name: 'uuid', description: 'Schedule UUID' })
  @ApiResponse({ status: 200, description: 'Schedule retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  findOne(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.activitySchedulesService.findOne(user_uuid, uuid)
  }

  @Get('activities/:activity_uuid/schedules')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all schedules for a specific activity' })
  @ApiParam({ name: 'activity_uuid', description: 'Activity UUID' })
  @ApiResponse({ status: 200, description: 'Activity schedules retrieved successfully' })
  findAllForActivity(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('activity_uuid') activity_uuid: string,
  ) {
    return this.activitySchedulesService.findAllForActivity(user_uuid, activity_uuid)
  }

  @Patch('schedules/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a schedule with versioning' })
  @ApiParam({ name: 'uuid', description: 'Schedule UUID' })
  @ApiResponse({ status: 200, description: 'Schedule updated successfully' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateActivityScheduleDto: UpdateActivityScheduleDto,
  ) {
    return this.activitySchedulesService.updateWithVersioning(user_uuid, uuid, updateActivityScheduleDto)
  }

  @Delete('schedules/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a schedule' })
  @ApiParam({ name: 'uuid', description: 'Schedule UUID' })
  @ApiResponse({ status: 204, description: 'Schedule deleted successfully' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.activitySchedulesService.remove(user_uuid, uuid)
  }
}
