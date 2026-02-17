import { ApiProperty } from '@nestjs/swagger'
import { ExerciseType } from '@/generated/prisma'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateExerciseDto {
  @ApiProperty({
    description: 'Muscle group UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  muscle_group_uuid: string

  @ApiProperty({
    description: 'Exercise name',
    example: 'Bench Press',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Exercise description',
    required: false,
    example: 'Flat barbell press',
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    description: 'Exercise tracking type',
    enum: ExerciseType,
    example: ExerciseType.REPS,
  })
  @IsEnum(ExerciseType)
  type: ExerciseType
}
