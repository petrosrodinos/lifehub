import { IsString, MinLength, IsNumber, IsOptional, Min, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExpenseAccountDto {
  @ApiProperty({
    description: 'Account name',
    example: 'Cash Wallet',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Account icon',
    example: '💰',
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    description: 'Account color',
    example: '#000000',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'Initial balance',
    example: 1000.00,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  balance?: number;

  @ApiProperty({
    description: 'Whether this account is used for professional/business activity',
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_professional?: boolean;
}
