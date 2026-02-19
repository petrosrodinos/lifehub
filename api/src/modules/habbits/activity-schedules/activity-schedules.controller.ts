import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ActivitySchedulesService } from './activity-schedules.service'
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto'
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'

@Controller()
@UseGuards(JwtGuard)
export class ActivitySchedulesController {
  constructor(private readonly activitySchedulesService: ActivitySchedulesService) { }

  @Post('activities/:activity_uuid/schedules')
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('activity_uuid') activity_uuid: string,
    @Body() createActivityScheduleDto: CreateActivityScheduleDto,
  ) {
    return this.activitySchedulesService.createForActivity(user_uuid, activity_uuid, createActivityScheduleDto)
  }

  @Get('schedules')
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.activitySchedulesService.findAll(user_uuid)
  }

  @Get('activities/:activity_uuid/schedules')
  @HttpCode(HttpStatus.OK)
  findAllForActivity(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('activity_uuid') activity_uuid: string,
  ) {
    return this.activitySchedulesService.findAllForActivity(user_uuid, activity_uuid)
  }

  @Patch('schedules/:uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateActivityScheduleDto: UpdateActivityScheduleDto,
  ) {
    return this.activitySchedulesService.updateWithVersioning(user_uuid, uuid, updateActivityScheduleDto)
  }

  @Delete('schedules/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.activitySchedulesService.remove(user_uuid, uuid)
  }
}
