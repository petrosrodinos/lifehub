import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadReceiptDto {
  @ApiProperty({
    description: 'Expense account UUID to debit (from_account)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  from_account_uuid: string;
}
