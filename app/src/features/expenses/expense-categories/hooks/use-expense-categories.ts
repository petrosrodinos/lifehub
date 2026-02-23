import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateExpenseCategoryDto,
  UpdateExpenseCategoryDto,
} from '../interfaces/expense-categories.interfaces'
import {
  getExpenseCategories,
  getExpenseCategory,
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from '../services/expense-categories'

const QUERY_KEYS = {
  expenseCategories: ['expense-categories'],
  expenseCategory: (uuid: string) => ['expense-categories', uuid],
  expenseSubcategories: ['expense-subcategories'],
  expenseEntries: ['expense-entries'],
}

export function useExpenseCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.expenseCategories,
    queryFn: getExpenseCategories,
  })
}

export function useExpenseCategory(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.expenseCategory(uuid),
    queryFn: () => getExpenseCategory(uuid),
    enabled: !!uuid,
  })
}

export function useCreateExpenseCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExpenseCategoryDto) => createExpenseCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseCategories })
      toast.success('Expense category created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create expense category', { duration: 3000 })
    },
  })
}

export function useUpdateExpenseCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseCategoryDto }) =>
      updateExpenseCategory(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseCategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseCategory(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
      toast.success('Expense category updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update expense category', { duration: 3000 })
    },
  })
}

export function useDeleteExpenseCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteExpenseCategory(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseCategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
      toast.success('Expense category deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete expense category', { duration: 3000 })
    },
  })
}
