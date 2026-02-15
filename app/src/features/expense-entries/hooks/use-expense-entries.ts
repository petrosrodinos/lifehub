import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateExpenseEntryDto,
  UpdateExpenseEntryDto,
  ExpenseEntriesQueryParams,
  AnalyticsQueryParams,
} from '../interfaces/expense-entries.interfaces'
import {
  getExpenseEntries,
  getExpenseEntry,
  createExpenseEntry,
  updateExpenseEntry,
  deleteExpenseEntry,
  getBalanceTrend,
  getIncomeExpense,
  getStats,
  getExpensesBySubcategory,
} from '../services/expense-entries'

const QUERY_KEYS = {
  expenseEntries: (params?: ExpenseEntriesQueryParams) => ['expense-entries', params],
  expenseEntry: (uuid: string) => ['expense-entries', uuid],
  expenseAccounts: ['expense-accounts'],
  analytics: {
    balanceTrend: (params: AnalyticsQueryParams) => ['expense-entries', 'analytics', 'balance-trend', params],
    incomeExpense: (params: AnalyticsQueryParams) => ['expense-entries', 'analytics', 'income-expense', params],
    stats: (params: AnalyticsQueryParams) => ['expense-entries', 'analytics', 'stats', params],
    expensesBySubcategory: ['expense-entries', 'analytics', 'expenses-by-subcategory'],
  },
}

export function useExpenseEntries(params?: ExpenseEntriesQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.expenseEntries(params),
    queryFn: () => getExpenseEntries(params),
  })
}

export function useExpenseEntry(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.expenseEntry(uuid),
    queryFn: () => getExpenseEntry(uuid),
    enabled: !!uuid,
  })
}

export function useCreateExpenseEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExpenseEntryDto) => createExpenseEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense-entries'] })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseAccounts })
      toast.success('Expense entry created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create expense entry', { duration: 3000 })
    },
  })
}

export function useUpdateExpenseEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseEntryDto }) =>
      updateExpenseEntry(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expense-entries'] })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntry(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseAccounts })
      toast.success('Expense entry updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update expense entry', { duration: 3000 })
    },
  })
}

export function useDeleteExpenseEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteExpenseEntry(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense-entries'] })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseAccounts })
      toast.success('Expense entry deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete expense entry', { duration: 3000 })
    },
  })
}

export function useBalanceTrend(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.balanceTrend(params),
    queryFn: () => getBalanceTrend(params),
    enabled: !!params.account_uuids && params.account_uuids.length > 0,
  })
}

export function useIncomeExpense(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.incomeExpense(params),
    queryFn: () => getIncomeExpense(params),
    enabled: !!params.account_uuids && params.account_uuids.length > 0,
  })
}

export function useStats(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.stats(params),
    queryFn: () => getStats(params),
    enabled: !!params.account_uuids && params.account_uuids.length > 0,
  })
}

export function useExpensesBySubcategory() {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.expensesBySubcategory,
    queryFn: getExpensesBySubcategory,
  })
}
