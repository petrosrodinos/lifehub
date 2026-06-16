import type { ExpenseAccount } from '../../expense-accounts/interfaces/expense-accounts.interfaces'
import type { ExpenseCategory } from '../../expense-categories/interfaces/expense-categories.interfaces'
import type { ExpenseSubcategory } from '../../expense-subcategories/interfaces/expense-subcategories.interfaces'
import type { ExpenseTag } from '../../expense-tags/interfaces/expense-tags.interfaces'
import type { ExpenseEntryType } from '../../expense-entries/interfaces/expense-entries.interfaces'

export interface ExpenseEntryPreset {
  id?: number
  uuid: string
  user_uuid: string
  title: string
  type: ExpenseEntryType
  amount: string | number
  description?: string
  from_account_uuid: string
  to_account_uuid?: string
  category_uuid?: string
  subcategory_uuid?: string
  created_at: string
  updated_at: string
  from_account?: ExpenseAccount
  to_account?: ExpenseAccount
  category?: ExpenseCategory
  subcategory?: ExpenseSubcategory
  tags?: ExpenseTag[]
}

export interface CreateExpenseEntryPresetDto {
  title: string
  type: ExpenseEntryType
  amount: number
  description?: string
  from_account_uuid: string
  to_account_uuid?: string
  category_uuid?: string
  subcategory_uuid?: string
  tag_uuids?: string[]
}

export interface UpdateExpenseEntryPresetDto {
  title?: string
  type?: ExpenseEntryType
  amount?: number
  description?: string
  from_account_uuid?: string
  to_account_uuid?: string
  category_uuid?: string
  subcategory_uuid?: string
  tag_uuids?: string[]
}
