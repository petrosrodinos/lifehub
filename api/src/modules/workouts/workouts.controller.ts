import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe'
import { WorkoutsQuerySchema, WorkoutsQueryType } from './schemas/workouts-query.schema'

@Controller('workouts')
@UseGuards(JwtGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return this.workoutsService.create(user_uuid, createWorkoutDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(WorkoutsQuerySchema)) query: WorkoutsQueryType,
  ) {
    return this.workoutsService.findAll(user_uuid, query)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutsService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutsService.update(uuid, user_uuid, updateWorkoutDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.workoutsService.remove(uuid, user_uuid)
  }
}
