import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsHexColor, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateActivityDto {
  @ApiProperty({ example: 'Read Book', description: 'Activity name' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name: string

  @ApiProperty({ example: 'Read 10 pages each session', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string

  @ApiProperty({ example: 'book-open', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  icon?: string

  @ApiProperty({ example: '#f59e0b', required: false })
  @IsOptional()
  @IsHexColor()
  color?: string

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  visible?: boolean

}
