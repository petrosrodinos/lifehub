import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator'

export class CompleteOccurrenceDto {
  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number

  @ApiProperty({ required: false, example: 'Felt great today' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string
}
