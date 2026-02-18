import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Food & Dining',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Category icon',
    example: '🍔',
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    description: 'Category color',
    example: '#FF5733',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;
}
