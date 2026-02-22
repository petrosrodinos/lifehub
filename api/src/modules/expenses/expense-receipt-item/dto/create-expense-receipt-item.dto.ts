import { IsString, MinLength, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExpenseReceiptItemDto {
    @ApiProperty({
        description: 'UUID of the receipt this item belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsString()
    receipt_uuid: string;

    @ApiProperty({
        description: 'Name of the item',
        example: 'Milk',
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiPropertyOptional({
        description: 'Quantity of the item',
        example: 2,
    })
    @IsOptional()
    @IsNumber()
    quantity?: number;

    @ApiProperty({
        description: 'Unit price of the item',
        example: 1.50,
    })
    @IsNumber()
    unit_price: number;

    @ApiProperty({
        description: 'Total price of the item',
        example: 3.00,
    })
    @IsNumber()
    total_price: number;

    @ApiPropertyOptional({
        description: 'UUID of the product',
    })
    @IsOptional()
    @IsUUID()
    product_uuid?: string;
}
