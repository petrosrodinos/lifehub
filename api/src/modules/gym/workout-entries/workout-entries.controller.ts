import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { WorkoutEntriesService } from './workout-entries.service'
import { CreateWorkoutEntryDto } from './dto/create-workout-entry.dto'
import { UpdateWorkoutEntryDto } from './dto/update-workout-entry.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe'
import { WorkoutEntriesQuerySchema, WorkoutEntriesQueryType } from './schemas/workout-entries-query.schema'
import { WorkoutEntriesAnalyticsQuerySchema, WorkoutEntriesAnalyticsQueryType } from './schemas/workout-entries-analytics-query.schema'

@ApiTags('Workout Entries')
@ApiBearerAuth()
@Controller('workout-entries')
@UseGuards(JwtGuard)
export class WorkoutEntriesController {
  constructor(private readonly workoutEntriesService: WorkoutEntriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new workout entry' })
  @ApiResponse({ status: 201, description: 'Workout entry created successfully' })
  create(
    @CurrentUser('uuid') user_uuid: string,
    @Body() createWorkoutEntryDto: CreateWorkoutEntryDto,
  ) {
    return this.workoutEntriesService.create(user_uuid, createWorkoutEntryDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all workout entries with optional filters' })
  @ApiResponse({ status: 200, description: 'Workout entries retrieved successfully' })
  findAll(
    @CurrentUser('uuid') user_uuid: string,
    @Query(new ZodValidationPipe(WorkoutEntriesQuerySchema)) query: WorkoutEntriesQueryType,
  ) {
    return this.workoutEntriesService.findAll(user_uuid, query)
  }

  @Get('analytics/progress')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get workout entry analytics and progress data' })
  @ApiResponse({ status: 200, description: 'Workout analytics retrieved successfully' })
  getAnalytics(
    @CurrentUser('uuid') user_uuid: string,
    @Query(new ZodValidationPipe(WorkoutEntriesAnalyticsQuerySchema)) query: WorkoutEntriesAnalyticsQueryType,
  ) {
    return this.workoutEntriesService.getAnalytics(user_uuid, query)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific workout entry by UUID' })
  @ApiParam({ name: 'uuid', description: 'Workout entry UUID' })
  @ApiResponse({ status: 200, description: 'Workout entry retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Workout entry not found' })
  findOne(
    @Param('uuid') uuid: string,
    @CurrentUser('uuid') user_uuid: string,
  ) {
    return this.workoutEntriesService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a workout entry' })
  @ApiParam({ name: 'uuid', description: 'Workout entry UUID' })
  @ApiResponse({ status: 200, description: 'Workout entry updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout entry not found' })
  update(
    @Param('uuid') uuid: string,
    @CurrentUser('uuid') user_uuid: string,
    @Body() updateWorkoutEntryDto: UpdateWorkoutEntryDto,
  ) {
    return this.workoutEntriesService.update(uuid, user_uuid, updateWorkoutEntryDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a workout entry' })
  @ApiParam({ name: 'uuid', description: 'Workout entry UUID' })
  @ApiResponse({ status: 204, description: 'Workout entry deleted successfully' })
  @ApiResponse({ status: 404, description: 'Workout entry not found' })
  remove(
    @Param('uuid') uuid: string,
    @CurrentUser('uuid') user_uuid: string,
  ) {
    return this.workoutEntriesService.remove(uuid, user_uuid)
  }
}
