import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger'
import { ScheduleSlotsService } from '../services/schedule-slots.service'
import { CreateScheduleSlotDto } from '../dto/create-schedule-slot.dto'
import { UpdateScheduleSlotDto } from '../dto/update-schedule-slot.dto'
import { ScheduleDay, SCHEDULE_DAYS } from '@/shared/config/schedule/schedule-days.config'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'

@ApiTags('Schedule Slots')
@Controller('schedule-slots')
@UseGuards(JwtGuard)
export class ScheduleSlotsController {
  constructor(private readonly scheduleSlotsService: ScheduleSlotsService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new schedule slot' })
  @ApiResponse({ status: 201, description: 'Schedule slot created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid time or activity' })
  create(
    @Body() createScheduleSlotDto: CreateScheduleSlotDto,
    @CurrentUser('user_uuid') userUuid: string,
  ) {
    return this.scheduleSlotsService.create(createScheduleSlotDto, userUuid)
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedule slots (default and user-specific)' })
  @ApiQuery({ name: 'day', required: false, enum: SCHEDULE_DAYS })
  @ApiResponse({ status: 200, description: 'Schedule slots retrieved successfully' })
  findAll(
    @Query('day') day?: ScheduleDay,
    @CurrentUser('user_uuid') userUuid?: string,
  ) {
    return this.scheduleSlotsService.findAll(userUuid, day)
  }

  @Get('by-day/:day')
  @ApiOperation({ summary: 'Get schedule slots for a specific day' })
  @ApiResponse({ status: 200, description: 'Schedule slots retrieved successfully' })
  findByDay(
    @Param('day') day: ScheduleDay,
    @CurrentUser('user_uuid') userUuid?: string,
  ) {
    return this.scheduleSlotsService.findByDay(day, userUuid)
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a specific schedule slot by UUID' })
  @ApiResponse({ status: 200, description: 'Schedule slot retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Schedule slot not found' })
  findOne(
    @Param('uuid') uuid: string,
    @CurrentUser('user_uuid') userUuid?: string,
  ) {
    return this.scheduleSlotsService.findOne(uuid, userUuid)
  }

  @Patch(':uuid')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a schedule slot' })
  @ApiResponse({ status: 200, description: 'Schedule slot updated successfully' })
  @ApiResponse({ status: 404, description: 'Schedule slot not found' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid time or activity' })
  update(
    @Param('uuid') uuid: string,
    @Body() updateScheduleSlotDto: UpdateScheduleSlotDto,
    @CurrentUser('user_uuid') userUuid: string,
  ) {
    return this.scheduleSlotsService.update(uuid, updateScheduleSlotDto, userUuid)
  }

  @Delete(':uuid')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a schedule slot' })
  @ApiResponse({ status: 200, description: 'Schedule slot deleted successfully' })
  @ApiResponse({ status: 404, description: 'Schedule slot not found' })
  remove(
    @Param('uuid') uuid: string,
    @CurrentUser('user_uuid') userUuid: string,
  ) {
    return this.scheduleSlotsService.remove(uuid, userUuid)
  }
}
