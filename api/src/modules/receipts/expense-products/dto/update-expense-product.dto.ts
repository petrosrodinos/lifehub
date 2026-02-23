import { PartialType } from '@nestjs/swagger';
import { CreateExpenseProductDto } from './create-expense-product.dto';

export class UpdateExpenseProductDto extends PartialType(CreateExpenseProductDto) { }
