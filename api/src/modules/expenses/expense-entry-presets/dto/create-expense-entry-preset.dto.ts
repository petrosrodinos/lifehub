import { IsString, IsNumber, IsOptional, IsEnum, Min, IsArray, IsUUID, MinLength, MaxLength, IsBoolean, IsInt, Max, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ExpenseEntryType, ExpenseRecurrenceFrequency } from '@/generated/prisma';

export class CreateExpenseEntryPresetDto {
  @ApiProperty({
    description: 'Preset title',
    example: 'Monthly rent',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

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
    description: 'Tag UUIDs to associate with the preset',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tag_uuids?: string[];

  @ApiProperty({
    description: 'Whether this preset automatically creates transactions on a schedule',
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_recurring?: boolean;

  @ApiProperty({
    description: 'Recurrence frequency',
    enum: ExpenseRecurrenceFrequency,
    required: false,
  })
  @ValidateIf((dto: CreateExpenseEntryPresetDto) => dto.is_recurring === true)
  @IsEnum(ExpenseRecurrenceFrequency)
  recurrence_frequency?: ExpenseRecurrenceFrequency;

  @ApiProperty({
    description: 'ISO weekday (1=Mon … 7=Sun) for weekly recurrence',
    example: 1,
    required: false,
  })
  @ValidateIf(
    (dto: CreateExpenseEntryPresetDto) =>
      dto.is_recurring === true && dto.recurrence_frequency === ExpenseRecurrenceFrequency.WEEKLY,
  )
  @IsInt()
  @Min(1)
  @Max(7)
  @Type(() => Number)
  recurrence_weekday?: number;

  @ApiProperty({
    description: 'Day of month (1-31) for monthly or yearly recurrence',
    example: 15,
    required: false,
  })
  @ValidateIf(
    (dto: CreateExpenseEntryPresetDto) =>
      dto.is_recurring === true &&
      (dto.recurrence_frequency === ExpenseRecurrenceFrequency.MONTHLY ||
        dto.recurrence_frequency === ExpenseRecurrenceFrequency.YEARLY),
  )
  @IsInt()
  @Min(1)
  @Max(31)
  @Type(() => Number)
  recurrence_day_of_month?: number;

  @ApiProperty({
    description: 'Month (1-12) for yearly recurrence',
    example: 1,
    required: false,
  })
  @ValidateIf(
    (dto: CreateExpenseEntryPresetDto) =>
      dto.is_recurring === true && dto.recurrence_frequency === ExpenseRecurrenceFrequency.YEARLY,
  )
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  recurrence_month?: number;
}
