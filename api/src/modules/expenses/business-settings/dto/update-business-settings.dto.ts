import { IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBusinessSettingsDto {
  @ApiProperty({
    description: 'Category UUID that marks an expense as a VAT payment. Null clears the setting.',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  vat_payment_category_uuid?: string | null;

  @ApiProperty({
    description: 'Subcategory UUID that marks an expense as a VAT payment. Null clears the setting.',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  vat_payment_subcategory_uuid?: string | null;
}
