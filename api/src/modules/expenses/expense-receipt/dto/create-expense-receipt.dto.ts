import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseReceiptDto {
    @ApiProperty({
        description: 'UUID of the expense entry this receipt belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsString()
    expense_entry_uuid: string;

    @ApiProperty({
        description: 'UUID of the store where the purchase was made',
        example: '550e8400-e29b-41d4-a716-446655440001',
        required: false,
    })
    @IsOptional()
    @IsString()
    store_uuid?: string;

    @ApiProperty({
        description: 'Date of the receipt',
        example: '2026-02-22T00:00:00.000Z',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    receipt_date?: string;

    @ApiProperty({
        description: 'Total amount of the receipt',
        example: 42.50,
    })
    @IsNumber()
    total_amount: number;
}
