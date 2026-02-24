import { PartialType } from '@nestjs/swagger';
import { CreateHiddenSubcategoryDto } from './create-hidden-subcategory.dto';

export class UpdateHiddenSubcategoryDto extends PartialType(CreateHiddenSubcategoryDto) {}
