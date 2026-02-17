import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { WorkoutEntriesService } from './workout-entries.service'
import { CreateWorkoutEntryDto } from './dto/create-workout-entry.dto'
import { UpdateWorkoutEntryDto } from './dto/update-workout-entry.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'

@Controller('workout-entries')
@UseGuards(JwtGuard)
export class WorkoutEntriesController {
  constructor(private readonly workoutEntriesService: WorkoutEntriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('uuid') user_uuid: string,
    @Body() createWorkoutEntryDto: CreateWorkoutEntryDto,
  ) {
    return this.workoutEntriesService.create(user_uuid, createWorkoutEntryDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('uuid') user_uuid: string) {
    return this.workoutEntriesService.findAll(user_uuid)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('uuid') uuid: string,
    @CurrentUser('uuid') user_uuid: string,
  ) {
    return this.workoutEntriesService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('uuid') uuid: string,
    @CurrentUser('uuid') user_uuid: string,
    @Body() updateWorkoutEntryDto: UpdateWorkoutEntryDto,
  ) {
    return this.workoutEntriesService.update(uuid, user_uuid, updateWorkoutEntryDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('uuid') uuid: string,
    @CurrentUser('uuid') user_uuid: string,
  ) {
    return this.workoutEntriesService.remove(uuid, user_uuid)
  }
}
