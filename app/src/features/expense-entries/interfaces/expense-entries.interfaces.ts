import type { PaginationMeta } from "../../../interfaces/pagination.interfaces"
import type { ExpenseAccount } from "../../expense-accounts/interfaces/expense-accounts.interfaces"
import type { ExpenseCategory } from "../../expense-categories/interfaces/expense-categories.interfaces"
import type { ExpenseSubcategory } from "../../expense-subcategories/interfaces/expense-subcategories.interfaces"
import type { ExpenseReceipt } from "../../expenses/expense-receipt/interfaces/expense-receipt.interfaces"

export interface ExpenseEntry {
  id?: number
  uuid: string
  user_uuid: string
  type: ExpenseEntryType
  amount: string | number
  description?: string
  from_account_uuid: string
  to_account_uuid?: string
  category_uuid?: string
  subcategory_uuid?: string
  entry_date: string
  created_at: string
  updated_at: string
  from_account?: ExpenseAccount
  to_account?: ExpenseAccount
  category?: ExpenseCategory
  subcategory?: ExpenseSubcategory
  expense_receipt?: ExpenseReceipt
}

export interface CreateExpenseEntryDto {
  type: ExpenseEntryType
  amount: number
  description?: string
  from_account_uuid: string
  to_account_uuid?: string
  category_uuid?: string
  subcategory_uuid?: string
  entry_date?: string
}

export interface UpdateExpenseEntryDto {
  type?: ExpenseEntryType
  amount?: number
  description?: string
  from_account_uuid?: string
  to_account_uuid?: string
  category_uuid?: string
  subcategory_uuid?: string
  entry_date?: string
}

export interface ExpenseEntriesQueryParams {
  page?: number
  limit?: number
  type?: ExpenseEntryType
  category_uuid?: string
  subcategory_uuid?: string
  from_account_uuid?: string
  to_account_uuid?: string
  from_date?: string
  to_date?: string
  search?: string
}

export interface ExpenseEntriesResponse {
  data: ExpenseEntry[]
  pagination: PaginationMeta
}

export const ExpenseEntryTypes = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  TRANSFER: 'TRANSFER',
} as const;

export type ExpenseEntryType = (typeof ExpenseEntryTypes)[keyof typeof ExpenseEntryTypes];

export interface AnalyticsQueryParams {
  account_uuids?: string;
  from_date?: string;
  to_date?: string;
}

export interface BalanceTrendData {
  date: string;
  balance: number;
}

export interface IncomeExpenseData {
  date: string;
  income: number;
  expense: number;
}

export interface StatsData {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface CategoryAnalyticsQueryParams {
  type?: ExpenseEntryType;
  group_by?: 'category' | 'subcategory';
  from_date?: string;
  to_date?: string;
}

export interface TransactionTrendQueryParams {
  type: ExpenseEntryType;
  category_uuid: string;
  subcategory_uuid?: string;
  from_date?: string;
  to_date?: string;
}

export interface TransactionTrendData {
  date: string;
  total: number;
}

export interface BreakdownData {
  uuid: string;
  name: string;
  categoryName?: string;
  icon?: string;
  color: string;
  total: number;
  count: number;
  percentage: number;
}

export interface ExpenseBySubcategoryData {
  subcategoryUuid: string;
  subcategoryName: string;
  categoryName: string;
  categoryColor: string;
  total: number;
  count: number;
  percentage: number;
}
