import { PartialType } from '@nestjs/swagger';
import { CreateExpenseStoreDto } from './create-expense-store.dto';

export class UpdateExpenseStoreDto extends PartialType(CreateExpenseStoreDto) {}
