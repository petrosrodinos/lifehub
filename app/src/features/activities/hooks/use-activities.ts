import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateActivityDto,
  ProgressRange,
  UpdateActivityDto,
} from '../interfaces/activities.interface'

const PROGRESS_SUMMARY_KEY = (activity_uuid: string) => ['habbits', 'activities', activity_uuid, 'progress-summary']
import {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getHabitOverview,
  getActivityOccurrences,
  getActivityProgressSummary,
} from '../services/activities'

const QUERY_KEYS = {
  activities: ['activities'],
  activity: (uuid: string) => ['activities', uuid],
  scheduleSlots: ['schedule-slots'],
  overview: ['habbits', 'analytics', 'overview'],
  progress: (activity_uuid: string, range: ProgressRange) => ['habbits', 'activities', activity_uuid, 'progress', range],
  occurrences: ['habbits', 'activities', 'occurrences'],
  progressSummary: (activity_uuid: string) => ['habbits', 'activities', activity_uuid, 'progress-summary'],
  analytics: (activity_uuid: string) => ['habbits', 'activities', activity_uuid, 'analytics'],
}

export function useActivities() {
  return useQuery({
    queryKey: QUERY_KEYS.activities,
    queryFn: getActivities,
  })
}

export function useActivity(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.activity(uuid),
    queryFn: () => getActivity(uuid),
    enabled: !!uuid,
  })
}

export function useCreateActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateActivityDto) => createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      toast.success('Activity created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create activity', { duration: 3000 })
    },
  })
}

export function useUpdateActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateActivityDto }) =>
      updateActivity(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activity(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.scheduleSlots })
      toast.success('Activity updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update activity', { duration: 3000 })
    },
  })
}

export function useDeleteActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteActivity(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: ['schedule-slots'] })
      toast.success('Activity deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete activity', { duration: 3000 })
    },
  })
}

export function useActivityOccurrences() {
  return useQuery({
    queryKey: QUERY_KEYS.occurrences,
    queryFn: () => getActivityOccurrences(),
  })
}


export function useHabitOverview() {
  return useQuery({
    queryKey: QUERY_KEYS.overview,
    queryFn: getHabitOverview,
  })
}


export function useActivityProgressSummary(activity_uuid: string | null) {
  return useQuery({
    queryKey: PROGRESS_SUMMARY_KEY(activity_uuid ?? ''),
    queryFn: () => getActivityProgressSummary(activity_uuid as string),
    enabled: !!activity_uuid,
  })
}
