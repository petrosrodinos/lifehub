import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CreateActivityScheduleDto, UpdateActivityScheduleDto } from '../interfaces/activity-schedules.interface'
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
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateActivityScheduleDto }) =>
      updateActivitySchedule(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habbits'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      toast.success('Schedule updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update schedule', { duration: 3000 })
    },
  })
}
