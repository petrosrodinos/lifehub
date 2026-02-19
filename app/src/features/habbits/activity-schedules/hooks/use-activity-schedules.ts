import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CreateActivityScheduleDto } from '../interfaces/activity-schedules.interface'
import { createActivitySchedule, updateActivitySchedule } from '../services/activity-schedules'

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
      if (variables.activityUuid) {
        queryClient.invalidateQueries({
          queryKey: ['habbits', 'activities', variables.activityUuid, 'progress-summary'],
        })
      }
    },
  })
}
