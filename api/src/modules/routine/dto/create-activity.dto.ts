import { IsString, IsHexColor, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateActivityDto {
  @ApiProperty({ example: 'hustle', description: 'Activity name' })
  @IsString()
  name: string

  @ApiProperty({ example: '#f59e0b', description: 'Activity color in hex format' })
  @IsHexColor()
  color: string

  @ApiProperty({ example: false, description: 'Whether this is a default activity', required: false })
  @IsOptional()
  @IsBoolean()
  is_default?: boolean
}
