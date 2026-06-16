import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getExpenseTags, createExpenseTag, updateExpenseTag, deleteExpenseTag } from '../services/expense-tags'
import type { CreateExpenseTagDto, UpdateExpenseTagDto } from '../interfaces/expense-tags.interfaces'

export const EXPENSE_TAGS_KEY = ['expense-tags']
const EXPENSE_ENTRIES_KEY = ['expense-entries']

export function useExpenseTags() {
  return useQuery({
    queryKey: EXPENSE_TAGS_KEY,
    queryFn: getExpenseTags,
  })
}

export function useCreateExpenseTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExpenseTagDto) => createExpenseTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_TAGS_KEY })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create tag', { duration: 3000 })
    },
  })
}

export function useUpdateExpenseTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseTagDto }) => updateExpenseTag(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_TAGS_KEY })
      queryClient.invalidateQueries({ queryKey: EXPENSE_ENTRIES_KEY })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update tag', { duration: 3000 })
    },
  })
}

export function useDeleteExpenseTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteExpenseTag(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_TAGS_KEY })
      queryClient.invalidateQueries({ queryKey: EXPENSE_ENTRIES_KEY })
      toast.success('Tag deleted', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete tag', { duration: 3000 })
    },
  })
}
