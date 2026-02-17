import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutSetsService } from './workout-sets.service';
import { CreateWorkoutSetDto } from './dto/create-workout-set.dto';
import { UpdateWorkoutSetDto } from './dto/update-workout-set.dto';

@Controller('workout-sets')
export class WorkoutSetsController {
  constructor(private readonly workoutSetsService: WorkoutSetsService) {}

  @Post()
  create(@Body() createWorkoutSetDto: CreateWorkoutSetDto) {
    return this.workoutSetsService.create(createWorkoutSetDto);
  }

  @Get()
  findAll() {
    return this.workoutSetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutSetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutSetDto: UpdateWorkoutSetDto) {
    return this.workoutSetsService.update(+id, updateWorkoutSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutSetsService.remove(+id);
  }
}
