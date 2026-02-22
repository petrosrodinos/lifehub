import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ExpenseEntryType } from '@/generated/prisma';

export class CreateExpenseEntryDto {
  @ApiProperty({
    description: 'Entry type',
    example: 'EXPENSE',
    enum: ExpenseEntryType,
  })
  @IsEnum(ExpenseEntryType)
  type: ExpenseEntryType;

  @ApiProperty({
    description: 'Transaction amount',
    example: 150.50,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    description: 'Entry description',
    example: 'Grocery shopping at Walmart',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Source account UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  from_account_uuid: string;

  @ApiProperty({
    description: 'Destination account UUID (for transfers)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  to_account_uuid?: string;

  @ApiProperty({
    description: 'Category UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  category_uuid?: string;

  @ApiProperty({
    description: 'Subcategory UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  subcategory_uuid?: string;

  @ApiProperty({
    description: 'Entry date',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  entry_date?: string;
}
