import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CreateActivityScheduleDateDto, UpdateActivityScheduleDateDto } from '../interfaces/activity-schedule-dates.interface'
import {
  createActivityScheduleDate,
  deleteActivityScheduleDate,
  getActivityScheduleDate,
  getActivityScheduleDates,
  updateActivityScheduleDate,
} from '../services/activity-schedule-dates'

const QUERY_KEYS = {
  list: ['habbits', 'activity-schedule-dates'],
  item: (id: number) => ['habbits', 'activity-schedule-dates', id],
}

export function useActivityScheduleDates() {
  return useQuery({
    queryKey: QUERY_KEYS.list,
    queryFn: getActivityScheduleDates,
  })
}

export function useActivityScheduleDate(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.item(id),
    queryFn: () => getActivityScheduleDate(id),
    enabled: Number.isFinite(id),
  })
}

export function useCreateActivityScheduleDate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateActivityScheduleDateDto) => createActivityScheduleDate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list })
      toast.success('Schedule date created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create schedule date', { duration: 3000 })
    },
  })
}

export function useUpdateActivityScheduleDate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateActivityScheduleDateDto }) =>
      updateActivityScheduleDate(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.item(variables.id) })
      toast.success('Schedule date updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update schedule date', { duration: 3000 })
    },
  })
}

export function useDeleteActivityScheduleDate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteActivityScheduleDate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list })
      toast.success('Schedule date deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete schedule date', { duration: 3000 })
    },
  })
}
