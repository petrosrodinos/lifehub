import { IsString, MinLength, MaxLength, IsOptional, IsHexColor } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseTagDto {
  @ApiProperty({ example: 'Business', description: 'Tag title' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiProperty({ example: '#8b5cf6', description: 'Tag color as hex string', required: false })
  @IsOptional()
  @IsHexColor()
  color?: string;
}
