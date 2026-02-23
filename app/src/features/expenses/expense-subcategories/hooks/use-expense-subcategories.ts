import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateExpenseSubcategoryDto,
  UpdateExpenseSubcategoryDto,
} from '../interfaces/expense-subcategories.interfaces'
import {
  getExpenseSubcategories,
  getExpenseSubcategory,
  createExpenseSubcategory,
  updateExpenseSubcategory,
  deleteExpenseSubcategory,
} from '../services/expense-subcategories'

const QUERY_KEYS = {
  expenseSubcategories: ['expense-subcategories'],
  expenseSubcategory: (uuid: string) => ['expense-subcategories', uuid],
  expenseEntries: ['expense-entries'],
}

export function useExpenseSubcategories() {
  return useQuery({
    queryKey: QUERY_KEYS.expenseSubcategories,
    queryFn: getExpenseSubcategories,
  })
}

export function useExpenseSubcategory(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.expenseSubcategory(uuid),
    queryFn: () => getExpenseSubcategory(uuid),
    enabled: !!uuid,
  })
}

export function useCreateExpenseSubcategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExpenseSubcategoryDto) => createExpenseSubcategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      toast.success('Expense subcategory created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create expense subcategory', { duration: 3000 })
    },
  })
}

export function useUpdateExpenseSubcategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseSubcategoryDto }) =>
      updateExpenseSubcategory(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategory(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
      toast.success('Expense subcategory updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update expense subcategory', { duration: 3000 })
    },
  })
}

export function useDeleteExpenseSubcategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteExpenseSubcategory(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
      toast.success('Expense subcategory deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete expense subcategory', { duration: 3000 })
    },
  })
}
