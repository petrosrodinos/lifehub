import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class SkipOccurrenceDto {
  @ApiProperty({ required: false, example: 'Travel day' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  skip_reason?: string

  @ApiProperty({ required: false, example: 'Will continue tomorrow' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string
}
