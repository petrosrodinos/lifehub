import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { WorkoutSetsService } from './workout-sets.service'
import { CreateWorkoutSetDto } from './dto/create-workout-set.dto'
import { UpdateWorkoutSetDto } from './dto/update-workout-set.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'

@ApiTags('Workout Sets')
@ApiBearerAuth()
@Controller('workout-sets')
@UseGuards(JwtGuard)
export class WorkoutSetsController {
  constructor(private readonly workoutSetsService: WorkoutSetsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new workout set' })
  @ApiResponse({ status: 201, description: 'Workout set created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createWorkoutSetDto: CreateWorkoutSetDto,
  ) {
    return this.workoutSetsService.create(user_uuid, createWorkoutSetDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all workout sets for the current user' })
  @ApiResponse({ status: 200, description: 'Workout sets retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.workoutSetsService.findAll(user_uuid)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific workout set by UUID' })
  @ApiParam({ name: 'uuid', description: 'Workout set UUID' })
  @ApiResponse({ status: 200, description: 'Workout set retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Workout set not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutSetsService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a workout set' })
  @ApiParam({ name: 'uuid', description: 'Workout set UUID' })
  @ApiResponse({ status: 200, description: 'Workout set updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout set not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateWorkoutSetDto: UpdateWorkoutSetDto,
  ) {
    return this.workoutSetsService.update(uuid, user_uuid, updateWorkoutSetDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a workout set' })
  @ApiParam({ name: 'uuid', description: 'Workout set UUID' })
  @ApiResponse({ status: 200, description: 'Workout set deleted successfully' })
  @ApiResponse({ status: 404, description: 'Workout set not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutSetsService.remove(uuid, user_uuid)
  }
}
