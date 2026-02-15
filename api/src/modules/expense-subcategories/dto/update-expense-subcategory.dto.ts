import { PartialType } from '@nestjs/swagger';
import { CreateExpenseSubcategoryDto } from './create-expense-subcategory.dto';

export class UpdateExpenseSubcategoryDto extends PartialType(CreateExpenseSubcategoryDto) {}
