import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateScheduleSlotDto,
  UpdateScheduleSlotDto,
  DuplicateDayDto,
  DuplicateSlotDto,
  ScheduleDay,
} from '../interfaces/routine.interface'
import {
  getScheduleSlots,
  getScheduleSlotsByDay,
  getScheduleSlot,
  createScheduleSlot,
  updateScheduleSlot,
  deleteScheduleSlot,
  duplicateDay,
  duplicateSlot,
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

export function useDuplicateDay() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DuplicateDayDto) => duplicateDay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-slots'] })
      toast.success('Day duplicated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to duplicate day', { duration: 3000 })
    },
  })
}

export function useDuplicateSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DuplicateSlotDto) => duplicateSlot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-slots'] })
      toast.success('Slot duplicated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to duplicate slot', { duration: 3000 })
    },
  })
}
