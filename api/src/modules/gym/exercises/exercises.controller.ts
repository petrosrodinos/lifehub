import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { ExercisesService } from './exercises.service'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { type AuthRole } from '@/modules/auth/interfaces/auth.interface'

@ApiTags('Exercises')
@ApiBearerAuth()
@Controller('exercises')
@UseGuards(JwtGuard)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({ status: 201, description: 'Exercise created successfully' })
  @ApiResponse({ status: 404, description: 'Muscle group not found' })
  @ApiResponse({ status: 409, description: 'Exercise with this name already exists' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExerciseDto: CreateExerciseDto,
  ) {
    return this.exercisesService.create(user_uuid, createExerciseDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all exercises for the current user' })
  @ApiResponse({ status: 200, description: 'Exercises retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.exercisesService.findAll(user_uuid)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific exercise by UUID' })
  @ApiParam({ name: 'uuid', description: 'Exercise UUID' })
  @ApiResponse({ status: 200, description: 'Exercise retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.exercisesService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an exercise' })
  @ApiParam({ name: 'uuid', description: 'Exercise UUID' })
  @ApiResponse({ status: 200, description: 'Exercise updated successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({ status: 409, description: 'Exercise with this name already exists' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @CurrentUser('role') role: AuthRole,
    @Param('uuid') uuid: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(uuid, user_uuid, role, updateExerciseDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an exercise' })
  @ApiParam({ name: 'uuid', description: 'Exercise UUID' })
  @ApiResponse({ status: 200, description: 'Exercise deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @CurrentUser('role') role: AuthRole,
    @Param('uuid') uuid: string,
  ) {
    return this.exercisesService.remove(uuid, user_uuid, role)
  }
}
