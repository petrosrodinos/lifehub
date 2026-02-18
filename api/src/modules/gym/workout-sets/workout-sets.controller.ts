import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { WorkoutSetsService } from './workout-sets.service'
import { CreateWorkoutSetDto } from './dto/create-workout-set.dto'
import { UpdateWorkoutSetDto } from './dto/update-workout-set.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'

@Controller('workout-sets')
@UseGuards(JwtGuard)
export class WorkoutSetsController {
  constructor(private readonly workoutSetsService: WorkoutSetsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createWorkoutSetDto: CreateWorkoutSetDto,
  ) {
    return this.workoutSetsService.create(user_uuid, createWorkoutSetDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.workoutSetsService.findAll(user_uuid)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutSetsService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateWorkoutSetDto: UpdateWorkoutSetDto,
  ) {
    return this.workoutSetsService.update(uuid, user_uuid, updateWorkoutSetDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutSetsService.remove(uuid, user_uuid)
  }
}
