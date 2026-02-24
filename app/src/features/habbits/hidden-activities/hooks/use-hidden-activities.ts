import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateHiddenActivityDto,
  UpdateHiddenActivityDto,
} from '../interfaces/hidden-activities.interfaces'
import {
  getHiddenActivities,
  getHiddenActivity,
  createHiddenActivity,
  updateHiddenActivity,
  deleteHiddenActivity,
} from '../services/hidden-activities'

const QUERY_KEYS = {
  hiddenActivities: ['hidden-activities'],
  hiddenActivity: (uuid: string) => ['hidden-activities', uuid],
  activities: ['activities'],
}

export function useHiddenActivities() {
  return useQuery({
    queryKey: QUERY_KEYS.hiddenActivities,
    queryFn: getHiddenActivities,
  })
}

export function useHiddenActivity(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.hiddenActivity(uuid),
    queryFn: () => getHiddenActivity(uuid),
    enabled: !!uuid,
  })
}

export function useCreateHiddenActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateHiddenActivityDto) => createHiddenActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenActivities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      toast.success('Activity hidden', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to hide activity', { duration: 3000 })
    },
  })
}

export function useUpdateHiddenActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateHiddenActivityDto }) =>
      updateHiddenActivity(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenActivities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenActivity(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      toast.success('Hidden activity updated', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update hidden activity', { duration: 3000 })
    },
  })
}

export function useDeleteHiddenActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteHiddenActivity(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.hiddenActivities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      toast.success('Activity unhidden', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unhide activity', { duration: 3000 })
    },
  })
}
