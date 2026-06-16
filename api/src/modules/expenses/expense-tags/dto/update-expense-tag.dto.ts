import { PartialType } from '@nestjs/swagger';
import { CreateExpenseTagDto } from './create-expense-tag.dto';

export class UpdateExpenseTagDto extends PartialType(CreateExpenseTagDto) {}
