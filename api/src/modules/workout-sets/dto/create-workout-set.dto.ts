import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ExerciseType } from '@/generated/prisma'
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateWorkoutSetDto {
  @ApiProperty({
    description: 'Workout UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  workout_uuid: string

  @ApiProperty({
    description: 'Exercise UUID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsString()
  exercise_uuid: string

  @ApiProperty({
    description: 'Set type',
    enum: ExerciseType,
    example: ExerciseType.REPS,
  })
  @IsEnum(ExerciseType)
  type: ExerciseType

  @ApiProperty({ required: false, example: 12 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  reps?: number

  @ApiProperty({ required: false, example: 60 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight?: number

  @ApiProperty({ required: false, example: 90 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  duration_seconds?: number

  @ApiProperty({ required: false, example: 400 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  distance_meters?: number

  @ApiProperty({ required: false, example: 120 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  reset_seconds?: number

  @ApiProperty({ required: false, example: 'Drop weight on last two reps' })
  @IsOptional()
  @IsString()
  notes?: string

  @ApiProperty({ required: false, example: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_dropset?: boolean

  @ApiProperty({ required: false, example: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_amrap?: boolean

  @ApiProperty({ required: false, example: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_rest?: boolean

  @ApiProperty({ required: false, example: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_warmup?: boolean

  @ApiProperty({ required: false, example: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_cooldown?: boolean

  @ApiProperty({ required: false, example: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_super_set?: boolean

  @ApiProperty({ example: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  order: number
}
