import { PartialType } from '@nestjs/swagger';
import { CreateExpenseAccountDto } from './create-expense-account.dto';

export class UpdateExpenseAccountDto extends PartialType(CreateExpenseAccountDto) {}
