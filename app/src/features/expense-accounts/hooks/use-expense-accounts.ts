import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateExpenseAccountDto,
  UpdateExpenseAccountDto,
} from '../interfaces/expense-accounts.interfaces'
import {
  getExpenseAccounts,
  getExpenseAccount,
  createExpenseAccount,
  updateExpenseAccount,
  deleteExpenseAccount,
} from '../services/expense-accounts'

const QUERY_KEYS = {
  expenseAccounts: ['expense-accounts'],
  expenseAccount: (uuid: string) => ['expense-accounts', uuid],
  expenseEntries: ['expense-entries'],
}

export function useExpenseAccounts() {
  return useQuery({
    queryKey: QUERY_KEYS.expenseAccounts,
    queryFn: getExpenseAccounts,
  })
}

export function useExpenseAccount(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.expenseAccount(uuid),
    queryFn: () => getExpenseAccount(uuid),
    enabled: !!uuid,
  })
}

export function useCreateExpenseAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExpenseAccountDto) => createExpenseAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseAccounts })
      toast.success('Expense account created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create expense account', { duration: 3000 })
    },
  })
}

export function useUpdateExpenseAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseAccountDto }) =>
      updateExpenseAccount(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseAccounts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseAccount(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
      toast.success('Expense account updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update expense account', { duration: 3000 })
    },
  })
}

export function useDeleteExpenseAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteExpenseAccount(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseAccounts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
      toast.success('Expense account deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete expense account', { duration: 3000 })
    },
  })
}
