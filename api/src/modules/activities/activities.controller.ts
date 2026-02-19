import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe'
import { ActivitiesService } from './activities.service'
import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { ActivityHabbitsQuerySchema, ActivityHabbitsQueryType } from './schemas/activity-habbits-query.schema'

@ApiTags('Activities')
@Controller('activities')
@UseGuards(JwtGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new activity' })
  @ApiResponse({ status: 201, description: 'Activity created successfully' })
  @ApiResponse({ status: 409, description: 'Activity with this name already exists' })
  create(
    @Body() createActivityDto: CreateActivityDto,
    @CurrentUser('user_uuid') userUuid: string,
  ) {
    return this.activitiesService.create(createActivityDto, userUuid)
  }

  @Get()
  @ApiOperation({ summary: 'Get all activities (default and user-specific)' })
  @ApiResponse({ status: 200, description: 'Activities retrieved successfully' })
  findAll(@CurrentUser('user_uuid') userUuid: string) {
    return this.activitiesService.findAll(userUuid)
  }

  @Get('habbits')
  @ApiOperation({ summary: 'Get all activity habbits' })
  @ApiResponse({ status: 200, description: 'Activity occurrences retrieved successfully' })
  getActivityHabbits(
    @CurrentUser('user_uuid') userUuid: string,
    @Query(new ZodValidationPipe(ActivityHabbitsQuerySchema)) query: ActivityHabbitsQueryType,
  ) {
    return this.activitiesService.getActivityHabbits(userUuid, query)
  }

  @Get('progress-summary')
  @ApiOperation({ summary: 'Get progress summary, optionally filtered by activity and date range' })
  @ApiResponse({ status: 200, description: 'Progress summary retrieved successfully' })
  getProgressSummary(
    @CurrentUser('user_uuid') userUuid: string,
    @Query(new ZodValidationPipe(ActivityHabbitsQuerySchema)) query: ActivityHabbitsQueryType,
  ) {
    return this.activitiesService.getProgressSummary(userUuid, query)
  }

  @Get('heatmaps')
  @ApiOperation({ summary: 'Get general and per-activity daily completion heatmaps (30d)' })
  @ApiResponse({ status: 200, description: 'Heatmaps retrieved successfully' })
  getCompletionHeatmaps(@CurrentUser('user_uuid') userUuid: string) {
    return this.activitiesService.getCompletionHeatmaps(userUuid)
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a specific activity by UUID' })
  @ApiResponse({ status: 200, description: 'Activity retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  findOne(
    @Param('uuid') uuid: string,
    @CurrentUser('user_uuid') userUuid: string,
  ) {
    return this.activitiesService.findOne(uuid, userUuid)
  }

  @Patch(':uuid')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an activity' })
  @ApiResponse({ status: 200, description: 'Activity updated successfully' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  @ApiResponse({ status: 409, description: 'Activity with this name already exists' })
  update(
    @Param('uuid') uuid: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @CurrentUser('user_uuid') userUuid: string,
  ) {
    return this.activitiesService.update(uuid, updateActivityDto, userUuid)
  }

  @Delete(':uuid')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an activity' })
  @ApiResponse({ status: 200, description: 'Activity deleted successfully' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  remove(
    @Param('uuid') uuid: string,
    @CurrentUser('user_uuid') userUuid: string,
  ) {
    return this.activitiesService.remove(uuid, userUuid)
  }
}
