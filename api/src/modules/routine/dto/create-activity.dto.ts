import { IsString, IsHexColor, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateActivityDto {
  @ApiProperty({ example: 'hustle', description: 'Activity name' })
  @IsString()
  name: string

  @ApiProperty({ example: '#f59e0b', description: 'Activity color in hex format' })
  @IsHexColor()
  color: string

}
