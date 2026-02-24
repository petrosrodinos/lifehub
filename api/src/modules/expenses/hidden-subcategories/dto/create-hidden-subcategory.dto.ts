import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHiddenSubcategoryDto {
  @ApiProperty({ description: 'Expense subcategory UUID to hide' })
  @IsUUID()
  subcategory_uuid: string;
}
