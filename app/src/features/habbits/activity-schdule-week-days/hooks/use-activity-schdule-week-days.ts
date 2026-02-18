import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CreateActivityScheduleWeekDayDto, UpdateActivityScheduleWeekDayDto } from '../interfaces/activity-schdule-week-days.interface'
import {
  createActivitySchduleWeekDay,
  deleteActivitySchduleWeekDay,
  getActivitySchduleWeekDay,
  getActivitySchduleWeekDays,
  updateActivitySchduleWeekDay,
} from '../services/activity-schdule-week-days'

const QUERY_KEYS = {
  list: ['habbits', 'activity-schdule-week-days'],
  item: (id: number) => ['habbits', 'activity-schdule-week-days', id],
}

export function useActivitySchduleWeekDays() {
  return useQuery({
    queryKey: QUERY_KEYS.list,
    queryFn: getActivitySchduleWeekDays,
  })
}

export function useActivitySchduleWeekDay(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.item(id),
    queryFn: () => getActivitySchduleWeekDay(id),
    enabled: Number.isFinite(id),
  })
}

export function useCreateActivitySchduleWeekDay() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateActivityScheduleWeekDayDto) => createActivitySchduleWeekDay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list })
      toast.success('Schedule week day created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create schedule week day', { duration: 3000 })
    },
  })
}

export function useUpdateActivitySchduleWeekDay() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateActivityScheduleWeekDayDto }) =>
      updateActivitySchduleWeekDay(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.item(variables.id) })
      toast.success('Schedule week day updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update schedule week day', { duration: 3000 })
    },
  })
}

export function useDeleteActivitySchduleWeekDay() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteActivitySchduleWeekDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list })
      toast.success('Schedule week day deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete schedule week day', { duration: 3000 })
    },
  })
}
