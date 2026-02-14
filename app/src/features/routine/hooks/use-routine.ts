import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateScheduleSlotDto,
  UpdateScheduleSlotDto,
  ScheduleDay,
} from '../interfaces/routine.interface'
import {
  getScheduleSlots,
  getScheduleSlotsByDay,
  getScheduleSlot,
  createScheduleSlot,
  updateScheduleSlot,
  deleteScheduleSlot,
} from '../services/routine'

const QUERY_KEYS = {
  scheduleSlots: (day?: ScheduleDay) => ['schedule-slots', day],
  scheduleSlot: (uuid: string) => ['schedule-slots', uuid],
}

export function useScheduleSlots(day?: ScheduleDay) {
  return useQuery({
    queryKey: QUERY_KEYS.scheduleSlots(day),
    queryFn: () => getScheduleSlots(day),
  })
}

export function useScheduleSlotsByDay(day: ScheduleDay) {
  return useQuery({
    queryKey: QUERY_KEYS.scheduleSlots(day),
    queryFn: () => getScheduleSlotsByDay(day),
    enabled: !!day,
  })
}

export function useScheduleSlot(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.scheduleSlot(uuid),
    queryFn: () => getScheduleSlot(uuid),
    enabled: !!uuid,
  })
}

export function useCreateScheduleSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateScheduleSlotDto) => createScheduleSlot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-slots'] })
      toast.success('Schedule slot created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create schedule slot', { duration: 3000 })
    },
  })
}

export function useUpdateScheduleSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateScheduleSlotDto }) =>
      updateScheduleSlot(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schedule-slots'] })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.scheduleSlot(variables.uuid) })
      toast.success('Schedule slot updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update schedule slot', { duration: 3000 })
    },
  })
}

export function useDeleteScheduleSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteScheduleSlot(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-slots'] })
      toast.success('Schedule slot deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete schedule slot', { duration: 3000 })
    },
  })
}
