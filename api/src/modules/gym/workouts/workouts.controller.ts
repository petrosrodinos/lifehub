import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { WorkoutsService } from './workouts.service'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe'
import { WorkoutsQuerySchema, WorkoutsQueryType } from './schemas/workouts-query.schema'

@ApiTags('Workouts')
@ApiBearerAuth()
@Controller('workouts')
@UseGuards(JwtGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: 201, description: 'Workout created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return this.workoutsService.create(user_uuid, createWorkoutDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all workouts with optional filters' })
  @ApiResponse({ status: 200, description: 'Workouts retrieved successfully' })
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(WorkoutsQuerySchema)) query: WorkoutsQueryType,
  ) {
    return this.workoutsService.findAll(user_uuid, query)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific workout by UUID' })
  @ApiParam({ name: 'uuid', description: 'Workout UUID' })
  @ApiResponse({ status: 200, description: 'Workout retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutsService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a workout' })
  @ApiParam({ name: 'uuid', description: 'Workout UUID' })
  @ApiResponse({ status: 200, description: 'Workout updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutsService.update(uuid, user_uuid, updateWorkoutDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a workout' })
  @ApiParam({ name: 'uuid', description: 'Workout UUID' })
  @ApiResponse({ status: 200, description: 'Workout deleted successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutsService.remove(uuid, user_uuid)
  }
}
