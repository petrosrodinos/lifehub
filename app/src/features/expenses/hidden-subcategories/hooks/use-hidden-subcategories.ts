import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateHiddenSubcategoryDto,
  UpdateHiddenSubcategoryDto,
} from '../interfaces/hidden-subcategories.interfaces'
import {
  getHiddenSubcategories,
  getHiddenSubcategory,
  createHiddenSubcategory,
  updateHiddenSubcategory,
  deleteHiddenSubcategory,
} from '../services/hidden-subcategories'

const QUERY_KEYS = {
  hiddenSubcategories: ['hidden-subcategories'],
  hiddenSubcategory: (uuid: string) => ['hidden-subcategories', uuid],
  expenseSubcategories: ['expense-subcategories'],
}

export function useHiddenSubcategories() {
  return useQuery({
    queryKey: QUERY_KEYS.hiddenSubcategories,
    queryFn: getHiddenSubcategories,
  })
}

export function useHiddenSubcategory(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.hiddenSubcategory(uuid),
    queryFn: () => getHiddenSubcategory(uuid),
    enabled: !!uuid,
  })
}

export function useCreateHiddenSubcategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateHiddenSubcategoryDto) => createHiddenSubcategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenSubcategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      toast.success('Subcategory hidden', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to hide subcategory', { duration: 3000 })
    },
  })
}

export function useUpdateHiddenSubcategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateHiddenSubcategoryDto }) =>
      updateHiddenSubcategory(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenSubcategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenSubcategory(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      toast.success('Hidden subcategory updated', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update hidden subcategory', { duration: 3000 })
    },
  })
}

export function useDeleteHiddenSubcategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteHiddenSubcategory(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenSubcategories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseSubcategories })
      toast.success('Subcategory unhidden', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unhide subcategory', { duration: 3000 })
    },
  })
}
