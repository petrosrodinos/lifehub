import { Injectable } from '@nestjs/common';
import { CreateActivityOccurrenceDto } from './dto/create-activity-occurrence.dto';
import { UpdateActivityOccurrenceDto } from './dto/update-activity-occurrence.dto';

@Injectable()
export class ActivityOccurrencesService {
  create(createActivityOccurrenceDto: CreateActivityOccurrenceDto) {
    return 'This action adds a new activityOccurrence';
  }

  findAll() {
    return `This action returns all activityOccurrences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityOccurrence`;
  }

  update(id: number, updateActivityOccurrenceDto: UpdateActivityOccurrenceDto) {
    return `This action updates a #${id} activityOccurrence`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityOccurrence`;
  }
}
