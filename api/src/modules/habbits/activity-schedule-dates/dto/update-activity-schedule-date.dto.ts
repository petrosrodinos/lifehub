import { PartialType } from '@nestjs/swagger';
import { CreateActivityScheduleDateDto } from './create-activity-schedule-date.dto';

export class UpdateActivityScheduleDateDto extends PartialType(CreateActivityScheduleDateDto) {}
