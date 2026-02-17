import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsString, Min } from 'class-validator'

export class CreateWorkoutEntryDto {
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

  @ApiProperty({ example: 1, minimum: 0 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  order: number
}
