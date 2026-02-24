import { Injectable } from '@nestjs/common';
import { CreateHiddenActivityDto } from './dto/create-hidden-activity.dto';
import { UpdateHiddenActivityDto } from './dto/update-hidden-activity.dto';

@Injectable()
export class HiddenActivitiesService {
  create(createHiddenActivityDto: CreateHiddenActivityDto) {
    return 'This action adds a new hiddenActivity';
  }

  findAll() {
    return `This action returns all hiddenActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hiddenActivity`;
  }

  update(id: number, updateHiddenActivityDto: UpdateHiddenActivityDto) {
    return `This action updates a #${id} hiddenActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} hiddenActivity`;
  }
}
