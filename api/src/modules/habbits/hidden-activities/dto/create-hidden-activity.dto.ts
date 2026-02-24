import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHiddenActivityDto {
  @ApiProperty({ description: 'Activity UUID to hide' })
  @IsUUID()
  activity_uuid: string;
}
