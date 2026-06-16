import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  getExpenseEntryPresets,
  createExpenseEntryPreset,
  updateExpenseEntryPreset,
  deleteExpenseEntryPreset,
} from '../services/expense-entry-presets'
import type {
  CreateExpenseEntryPresetDto,
  UpdateExpenseEntryPresetDto,
} from '../interfaces/expense-entry-presets.interfaces'

export const EXPENSE_ENTRY_PRESETS_KEY = ['expense-entry-presets']

export function useExpenseEntryPresets() {
  return useQuery({
    queryKey: EXPENSE_ENTRY_PRESETS_KEY,
    queryFn: getExpenseEntryPresets,
  })
}

export function useCreateExpenseEntryPreset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExpenseEntryPresetDto) => createExpenseEntryPreset(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_ENTRY_PRESETS_KEY })
      toast.success('Preset transaction created', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create preset transaction', { duration: 3000 })
    },
  })
}

export function useUpdateExpenseEntryPreset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseEntryPresetDto }) =>
      updateExpenseEntryPreset(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_ENTRY_PRESETS_KEY })
      toast.success('Preset transaction updated', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update preset transaction', { duration: 3000 })
    },
  })
}

export function useDeleteExpenseEntryPreset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteExpenseEntryPreset(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_ENTRY_PRESETS_KEY })
      toast.success('Preset transaction deleted', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete preset transaction', { duration: 3000 })
    },
  })
}
