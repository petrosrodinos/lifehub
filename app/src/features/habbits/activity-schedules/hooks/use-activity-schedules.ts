import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CreateActivityScheduleDto } from '../interfaces/activity-schedules.interface'
import { createActivitySchedule, deleteActivitySchedule, getAllActivitySchedules, getActivitySchedule, getActivitySchedules, updateActivitySchedule } from '../services/activity-schedules'

const QueryKeys = {
  all: ['habbits', 'schedules'],
  byActivity: (activity_uuid: string) => ['habbits', 'schedules', activity_uuid],
  byUuid: (schedule_uuid: string) => ['habbits', 'schedules', 'detail', schedule_uuid],
}

export function useAllActivitySchedules(enabled = true) {
  return useQuery({
    queryKey: QueryKeys.all,
    queryFn: getAllActivitySchedules,
    enabled,
  })
}

export function useActivitySchedules(activity_uuid: string | null, enabled = true) {
  return useQuery({
    queryKey: QueryKeys.byActivity(activity_uuid ?? ''),
    queryFn: () => getActivitySchedules(activity_uuid as string),
    enabled: !!activity_uuid && enabled,
  })
}

export function useActivityScheduleDetails(schedule_uuid: string | null, enabled = true) {
  return useQuery({
    queryKey: QueryKeys.byUuid(schedule_uuid ?? ''),
    queryFn: () => getActivitySchedule(schedule_uuid as string),
    enabled: !!schedule_uuid && enabled,
  })
}

export function useCreateActivitySchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ activity_uuid, data }: { activity_uuid: string; data: CreateActivityScheduleDto }) =>
      createActivitySchedule(activity_uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['habbits'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.invalidateQueries({ queryKey: ['activities', variables.activity_uuid] })
      toast.success('Schedule created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create schedule', { duration: 3000 })
    },
  })
}


export function useUpdateActivitySchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateActivitySchedule,
    onSuccess: () => {
      toast.success('Schedule updated for future occurrences', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Could not update schedule')
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: ['habbits', 'activities', 'occurrences'] })
      queryClient.invalidateQueries({ queryKey: ['habbits', 'activity-logs'] })
      queryClient.invalidateQueries({ queryKey: QueryKeys.all })
      if (variables.uuid) {
        queryClient.invalidateQueries({ queryKey: QueryKeys.byUuid(variables.uuid) })
      }
      if (variables.activityUuid) {
        queryClient.invalidateQueries({
          queryKey: ['habbits', 'activities', variables.activityUuid, 'progress-summary'],
        })
        queryClient.invalidateQueries({ queryKey: QueryKeys.byActivity(variables.activityUuid) })
      }
    },
  })
}

export function useDeleteActivitySchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ schedule_uuid }: { schedule_uuid: string; activity_uuid?: string }) =>
      deleteActivitySchedule(schedule_uuid),
    onSuccess: (_, variables) => {
      toast.success('Schedule deactivated', { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: ['habbits'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.invalidateQueries({ queryKey: QueryKeys.all })
      if (variables.schedule_uuid) {
        queryClient.invalidateQueries({ queryKey: QueryKeys.byUuid(variables.schedule_uuid) })
      }
      if (variables.activity_uuid) {
        queryClient.invalidateQueries({ queryKey: QueryKeys.byActivity(variables.activity_uuid) })
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to deactivate schedule', { duration: 3000 })
    },
  })
}
