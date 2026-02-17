import { Injectable } from '@nestjs/common';
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto';
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto';

@Injectable()
export class MuscleGroupsService {
  create(createMuscleGroupDto: CreateMuscleGroupDto) {
    return 'This action adds a new muscleGroup';
  }

  findAll() {
    return `This action returns all muscleGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} muscleGroup`;
  }

  update(id: number, updateMuscleGroupDto: UpdateMuscleGroupDto) {
    return `This action updates a #${id} muscleGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} muscleGroup`;
  }
}
