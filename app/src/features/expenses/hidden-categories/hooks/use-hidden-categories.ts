import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateHiddenCategoryDto,
  UpdateHiddenCategoryDto,
} from '../interfaces/hidden-categories.interfaces'
import {
  getHiddenCategories,
  getHiddenCategory,
  createHiddenCategory,
  updateHiddenCategory,
  deleteHiddenCategory,
} from '../services/hidden-categories'

const QUERY_KEYS = {
  hiddenCategories: ['hidden-categories'],
  hiddenCategory: (uuid: string) => ['hidden-categories', uuid],
  expenseCategories: ['expense-categories'],
}

export function useHiddenCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.hiddenCategories,
    queryFn: getHiddenCategories,
  })
}

export function useHiddenCategory(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.hiddenCategory(uuid),
    queryFn: () => getHiddenCategory(uuid),
    enabled: !!uuid,
  })
}

export function useCreateHiddenCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateHiddenCategoryDto) => createHiddenCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenCategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseCategories })
      toast.success('Category hidden', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to hide category', { duration: 3000 })
    },
  })
}

export function useUpdateHiddenCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateHiddenCategoryDto }) =>
      updateHiddenCategory(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenCategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenCategory(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseCategories })
      toast.success('Hidden category updated', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update hidden category', { duration: 3000 })
    },
  })
}

export function useDeleteHiddenCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteHiddenCategory(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenCategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseCategories })
      toast.success('Category unhidden', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unhide category', { duration: 3000 })
    },
  })
}
