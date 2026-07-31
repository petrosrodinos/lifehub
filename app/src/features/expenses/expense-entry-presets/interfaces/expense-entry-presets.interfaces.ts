import type { ExpenseAccount } from '../../expense-accounts/interfaces/expense-accounts.interfaces'
import type { ExpenseCategory } from '../../expense-categories/interfaces/expense-categories.interfaces'
import type { ExpenseSubcategory } from '../../expense-subcategories/interfaces/expense-subcategories.interfaces'
import type { ExpenseTag } from '../../expense-tags/interfaces/expense-tags.interfaces'
import type { ExpenseEntryType } from '../../expense-entries/interfaces/expense-entries.interfaces'

export const ExpenseRecurrenceFrequencies = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
} as const

export type ExpenseRecurrenceFrequency =
  (typeof ExpenseRecurrenceFrequencies)[keyof typeof ExpenseRecurrenceFrequencies]

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
  is_recurring: boolean
  recurrence_frequency?: ExpenseRecurrenceFrequency | null
  recurrence_weekday?: number | null
  recurrence_day_of_month?: number | null
  recurrence_month?: number | null
  next_run_at?: string | null
  last_run_at?: string | null
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
  is_recurring?: boolean
  recurrence_frequency?: ExpenseRecurrenceFrequency
  recurrence_weekday?: number
  recurrence_day_of_month?: number
  recurrence_month?: number
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
  is_recurring?: boolean
  recurrence_frequency?: ExpenseRecurrenceFrequency
  recurrence_weekday?: number
  recurrence_day_of_month?: number
  recurrence_month?: number
}
