import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, Min, IsInt, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductTrackingMethod, ProductPurchaseStatus } from '@/generated/prisma';

export class CreateProductPurchaseDto {
  @ApiProperty({
    description: 'Product UUID (create the product first via /expense-products if it does not exist yet)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  product_uuid: string;

  @ApiPropertyOptional({ description: 'Existing expense entry UUID to link this purchase to' })
  @IsOptional()
  @IsUUID('4')
  expense_entry_uuid?: string;

  @ApiPropertyOptional({
    description: 'When true (and expense_entry_uuid is not given), also creates a linked expense entry from purchase_price. Requires from_account_uuid.',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  create_expense?: boolean;

  @ApiPropertyOptional({ description: 'Source account UUID, required when create_expense is true' })
  @IsOptional()
  @IsUUID('4')
  from_account_uuid?: string;

  @ApiPropertyOptional({ description: 'Category UUID for the auto-created expense (create_expense only, defaults to the product category)' })
  @IsOptional()
  @IsUUID('4')
  category_uuid?: string;

  @ApiPropertyOptional({ description: 'Subcategory UUID for the auto-created expense (create_expense only, defaults to the product subcategory)' })
  @IsOptional()
  @IsUUID('4')
  subcategory_uuid?: string;

  @ApiPropertyOptional({ description: 'Description for the auto-created expense (create_expense only, defaults to the product name)' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Purchase price. Required unless expense_entry_uuid is provided (price is then taken from the expense).',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  purchase_price?: number;

  @ApiPropertyOptional({ description: 'Purchase date, defaults to now (or the linked expense date)' })
  @IsOptional()
  @IsDateString()
  purchase_date?: string;

  @ApiProperty({ description: 'Tracking method', enum: ProductTrackingMethod, example: ProductTrackingMethod.START_FINISH })
  @IsEnum(ProductTrackingMethod)
  tracking_method: ProductTrackingMethod;

  @ApiPropertyOptional({ description: 'Status override, mainly used for PAUSED/DISCARDED', enum: ProductPurchaseStatus })
  @IsOptional()
  @IsEnum(ProductPurchaseStatus)
  status?: ProductPurchaseStatus;

  @ApiPropertyOptional({ description: 'Date usage started' })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({ description: 'Date the product was actually used up / finished. Pass null to clear it (e.g. to undo marking a purchase finished).', nullable: true })
  @IsOptional()
  @IsDateString()
  actual_finish_date?: string | null;

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

  @ApiPropertyOptional({ description: 'Number of days consumption_amount covers, e.g. 1 for "per day", 7 for "per week"', example: 1, default: 1 })
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
