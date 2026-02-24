import { PartialType } from '@nestjs/swagger';
import { CreateHiddenActivityDto } from './create-hidden-activity.dto';

export class UpdateHiddenActivityDto extends PartialType(CreateHiddenActivityDto) {}
