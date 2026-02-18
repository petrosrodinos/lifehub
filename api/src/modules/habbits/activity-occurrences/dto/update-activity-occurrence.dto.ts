import { PartialType } from '@nestjs/swagger';
import { CreateActivityOccurrenceDto } from './create-activity-occurrence.dto';

export class UpdateActivityOccurrenceDto extends PartialType(CreateActivityOccurrenceDto) {}
