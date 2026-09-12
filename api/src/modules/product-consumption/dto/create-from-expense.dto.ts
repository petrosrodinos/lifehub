import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, Min, IsInt, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductTrackingMethod } from '@/generated/prisma';

export class InlineProductDto {
  @ApiProperty({ description: 'Product name', example: 'CeraVe Moisturizer' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Product brand' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ description: 'Unit of measurement' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ description: 'Product size' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  size?: number;

  @ApiPropertyOptional({ description: 'Category UUID, defaults to the expense category' })
  @IsOptional()
  @IsUUID('4')
  category_uuid?: string;

  @ApiPropertyOptional({ description: 'Subcategory UUID, defaults to the expense subcategory' })
  @IsOptional()
  @IsUUID('4')
  subcategory_uuid?: string;
}

export class CreateFromExpenseDto {
  @ApiPropertyOptional({ description: 'Existing product UUID to link this purchase to' })
  @IsOptional()
  @IsUUID('4')
  product_uuid?: string;

  @ApiPropertyOptional({
    description: 'Inline product fields, used to get-or-create a product by name when product_uuid is not given',
    type: InlineProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => InlineProductDto)
  product?: InlineProductDto;

  @ApiProperty({ description: 'Tracking method', enum: ProductTrackingMethod, example: ProductTrackingMethod.START_FINISH })
  @IsEnum(ProductTrackingMethod)
  tracking_method: ProductTrackingMethod;

  @ApiPropertyOptional({ description: 'Date usage started' })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({ description: 'Total units in the package (quantity/dose method)', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  total_units?: number;

  @ApiPropertyOptional({ description: 'Unit label, e.g. pills, ml, applications', example: 'pills' })
  @IsOptional()
  @IsString()
  unit_label?: string;

  @ApiPropertyOptional({ description: 'Amount consumed per consumption_period_days', example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  consumption_amount?: number;

  @ApiPropertyOptional({ description: 'Number of days consumption_amount covers', example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  consumption_period_days?: number;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}
