import { PartialType } from '@nestjs/swagger';
import { CreateHiddenCategoryDto } from './create-hidden-category.dto';

export class UpdateHiddenCategoryDto extends PartialType(CreateHiddenCategoryDto) {}
