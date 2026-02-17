import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateMuscleGroupDto {
  @ApiProperty({
    description: 'Muscle group name',
    example: 'Chest',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Display color',
    example: '#ef4444',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string
}
