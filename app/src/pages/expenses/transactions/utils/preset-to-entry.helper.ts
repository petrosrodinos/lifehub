import type { CreateExpenseEntryDto } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'
import type { ExpenseEntryPreset } from '../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces'

export function mapPresetToCreateEntryDto(preset: ExpenseEntryPreset): Partial<CreateExpenseEntryDto> {
  const amount = typeof preset.amount === 'string' ? parseFloat(preset.amount) : preset.amount

  return {
    type: preset.type,
    amount,
    description: preset.description,
    from_account_uuid: preset.from_account_uuid,
    to_account_uuid: preset.to_account_uuid,
    category_uuid: preset.category_uuid,
    subcategory_uuid: preset.subcategory_uuid,
    entry_date: new Date().toISOString().split('T')[0],
    tag_uuids: preset.tags?.map((tag) => tag.uuid) ?? [],
  }
}
