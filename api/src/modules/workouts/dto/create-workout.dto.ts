import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsOptional, IsString } from 'class-validator'

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Workout name',
    required: false,
    example: 'Push Day',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    description: 'Workout notes',
    required: false,
    example: 'Focus on controlled negatives',
  })
  @IsOptional()
  @IsString()
  notes?: string

  @ApiProperty({
    description: 'Workout start timestamp',
    required: false,
    example: '2026-02-17T07:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  started_at?: string

  @ApiProperty({
    description: 'Workout finish timestamp',
    required: false,
    example: '2026-02-17T08:15:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  finished_at?: string
}
