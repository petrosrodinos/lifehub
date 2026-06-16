import { PartialType } from '@nestjs/swagger';
import { CreateExpenseEntryPresetDto } from './create-expense-entry-preset.dto';

export class UpdateExpenseEntryPresetDto extends PartialType(CreateExpenseEntryPresetDto) {}
