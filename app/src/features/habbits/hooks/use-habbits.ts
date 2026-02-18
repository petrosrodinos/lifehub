import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CompleteOccurrenceDto,
  CreateHabitActivityDto,
  CreateHabitScheduleDto,
  HabitLogsQuery,
  ProgressRange,
  SkipOccurrenceDto,
  UpdateHabitActivityDto,
  UpdateHabitScheduleDto,
} from '../interfaces/habbits.interface'
import {
  completeHabitOccurrence,
  createHabitActivity,
  createHabitSchedule,
  deleteHabitActivity,
  getHabitActivities,
  getHabitActivity,
  getHabitActivityProgress,
  getHabitLogs,
  getHabitOverview,
  skipHabitOccurrence,
  updateHabitActivity,
  updateHabitSchedule,
} from '../services/habbits'

const QUERY_KEYS = {
  activities: ['habbits', 'activities'],
  activity: (uuid: string) => ['habbits', 'activities', uuid],
  logs: (query?: HabitLogsQuery) => ['habbits', 'logs', query],
  overview: ['habbits', 'analytics', 'overview'],
  progress: (activity_uuid: string, range: ProgressRange) => ['habbits', 'activities', activity_uuid, 'progress', range],
}

export function useHabitActivities() {
  return useQuery({
    queryKey: QUERY_KEYS.activities,
    queryFn: getHabitActivities,
  })
}

export function useHabitActivity(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.activity(uuid),
    queryFn: () => getHabitActivity(uuid),
    enabled: !!uuid,
  })
}

export function useHabitLogs(query?: HabitLogsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.logs(query),
    queryFn: () => getHabitLogs(query),
  })
}

export function useHabitOverview() {
  return useQuery({
    queryKey: QUERY_KEYS.overview,
    queryFn: getHabitOverview,
  })
}

export function useHabitActivityProgress(activity_uuid: string, range: ProgressRange = '30d') {
  return useQuery({
    queryKey: QUERY_KEYS.progress(activity_uuid, range),
    queryFn: () => getHabitActivityProgress(activity_uuid, range),
    enabled: !!activity_uuid,
  })
}

export function useCreateHabitActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateHabitActivityDto) => createHabitActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      toast.success('Habit activity created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create habit activity', { duration: 3000 })
    },
  })
}

export function useUpdateHabitActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateHabitActivityDto }) =>
      updateHabitActivity(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activity(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      toast.success('Habit activity updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update habit activity', { duration: 3000 })
    },
  })
}

export function useDeleteHabitActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteHabitActivity(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.invalidateQueries({ queryKey: ['schedule-slots'] })
      toast.success('Habit activity deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete habit activity', { duration: 3000 })
    },
  })
}

export function useCreateHabitSchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ activity_uuid, data }: { activity_uuid: string; data: CreateHabitScheduleDto }) =>
      createHabitSchedule(activity_uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activity(variables.activity_uuid) })
      toast.success('Schedule created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create schedule', { duration: 3000 })
    },
  })
}

export function useUpdateHabitSchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateHabitScheduleDto }) =>
      updateHabitSchedule(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      toast.success('Schedule updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update schedule', { duration: 3000 })
    },
  })
}

export function useCompleteHabitOccurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: CompleteOccurrenceDto }) =>
      completeHabitOccurrence(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overview })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      toast.success('Occurrence completed', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to complete occurrence', { duration: 3000 })
    },
  })
}

export function useSkipHabitOccurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: SkipOccurrenceDto }) =>
      skipHabitOccurrence(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overview })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      toast.success('Occurrence skipped', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to skip occurrence', { duration: 3000 })
    },
  })
}
