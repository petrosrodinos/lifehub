import type { ExpenseEntry } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'
import type {
  CreateExpenseEntryPresetDto,
  ExpenseEntryPreset,
} from '../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces'

function parseAmount(amount: string | number): number {
  return typeof amount === 'string' ? parseFloat(amount) : amount
}

export function mapPresetToFormData(preset: ExpenseEntryPreset): Partial<CreateExpenseEntryPresetDto> {
  return {
    title: preset.title,
    type: preset.type,
    amount: parseAmount(preset.amount),
    description: preset.description,
    from_account_uuid: preset.from_account_uuid,
    to_account_uuid: preset.to_account_uuid,
    category_uuid: preset.category_uuid,
    subcategory_uuid: preset.subcategory_uuid,
    tag_uuids: preset.tags?.map((tag) => tag.uuid) ?? [],
    is_recurring: preset.is_recurring,
    recurrence_frequency: preset.recurrence_frequency ?? undefined,
    recurrence_weekday: preset.recurrence_weekday ?? undefined,
    recurrence_day_of_month: preset.recurrence_day_of_month ?? undefined,
    recurrence_month: preset.recurrence_month ?? undefined,
  }
}

export function mapEntryToPresetFormData(entry: ExpenseEntry): Partial<CreateExpenseEntryPresetDto> {
  const title = entry.subcategory?.name || entry.category?.name || entry.description || 'Transaction'

  return {
    title,
    type: entry.type,
    amount: parseAmount(entry.amount),
    description: entry.description,
    from_account_uuid: entry.from_account_uuid,
    to_account_uuid: entry.to_account_uuid,
    category_uuid: entry.category_uuid,
    subcategory_uuid: entry.subcategory_uuid,
    tag_uuids: entry.tags?.map((tag) => tag.uuid) ?? [],
  }
}
