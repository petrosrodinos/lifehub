import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHiddenCategoryDto {
  @ApiProperty({ description: 'Expense category UUID to hide' })
  @IsUUID()
  category_uuid: string;
}
