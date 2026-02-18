import { ActivityRepeatType, ActivityTargetType, ActivityTargetUnit, FrequencyPeriod } from '@/generated/prisma'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min } from 'class-validator'

export class CreateActivityScheduleDto {
  @ApiProperty({ enum: ActivityRepeatType })
  @IsEnum(ActivityRepeatType)
  repeat_type: ActivityRepeatType

  @ApiProperty({ required: false, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  interval_days?: number

  @ApiProperty({ required: false, example: '07:30' })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  time_of_day?: string

  @ApiProperty({ required: false, minimum: 1, maximum: 31 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  frequency_value?: number

  @ApiProperty({ required: false, enum: FrequencyPeriod })
  @IsOptional()
  @IsEnum(FrequencyPeriod)
  frequency_period?: FrequencyPeriod

  @ApiProperty({ enum: ActivityTargetType })
  @IsEnum(ActivityTargetType)
  target_type: ActivityTargetType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  target_value?: number

  @ApiProperty({ required: false, enum: ActivityTargetUnit })
  @IsOptional()
  @IsEnum(ActivityTargetUnit)
  target_unit?: ActivityTargetUnit

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  target_unit_label?: string

  @ApiProperty({ required: false, type: [Number], example: [1, 3, 5] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(7, { each: true })
  weekdays?: number[]

  @ApiProperty({ required: false, type: [String], example: ['2026-03-01', '2026-03-18'] })
  @IsOptional()
  @IsArray()
  @IsDateString({}, { each: true })
  specific_dates?: string[]
}
