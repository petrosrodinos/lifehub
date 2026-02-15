import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseSubcategoryDto {
  @ApiProperty({
    description: 'Category UUID this subcategory belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  category_uuid: string;

  @ApiProperty({
    description: 'Subcategory name',
    example: 'Groceries',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
