import { Injectable } from '@nestjs/common';
import { CreateWorkoutSetDto } from './dto/create-workout-set.dto';
import { UpdateWorkoutSetDto } from './dto/update-workout-set.dto';

@Injectable()
export class WorkoutSetsService {
  create(createWorkoutSetDto: CreateWorkoutSetDto) {
    return 'This action adds a new workoutSet';
  }

  findAll() {
    return `This action returns all workoutSets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutSet`;
  }

  update(id: number, updateWorkoutSetDto: UpdateWorkoutSetDto) {
    return `This action updates a #${id} workoutSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutSet`;
  }
}
