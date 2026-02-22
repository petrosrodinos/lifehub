import { IsString, MinLength, IsOptional, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExpenseProductDto {
    @ApiProperty({
        description: 'Product name',
        example: 'Whole Milk',
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiPropertyOptional({
        description: 'Product brand',
        example: 'Arla',
    })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiPropertyOptional({
        description: 'Unit of measurement',
        example: 'L',
    })
    @IsOptional()
    @IsString()
    unit?: string;

    @ApiPropertyOptional({
        description: 'Product size',
        example: 1.5,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    size?: number;

    @ApiPropertyOptional({
        description: 'Category UUID',
    })
    @IsOptional()
    @IsUUID()
    category_uuid?: string;

    @ApiPropertyOptional({
        description: 'Subcategory UUID',
    })
    @IsOptional()
    @IsUUID()
    subcategory_uuid?: string;
}
