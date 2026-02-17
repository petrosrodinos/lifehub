import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateWorkoutEntryDto,
  UpdateWorkoutEntryDto,
} from '../interfaces/workout-entries.interface'
import {
  createWorkoutEntry,
  deleteWorkoutEntry,
  getWorkoutEntry,
  getWorkoutEntries,
  updateWorkoutEntry,
} from '../services/workout-entries'

const QUERY_KEYS = {
  workoutEntries: ['workout-entries'],
  workoutEntry: (uuid: string) => ['workout-entries', uuid],
  workoutSets: ['workout-sets'],
  workouts: ['workouts'],
  exercises: ['exercises'],
}

export function useWorkoutEntries(params?: { exercise_uuid?: string; workout_uuid?: string }) {
  return useQuery({
    queryKey: [...QUERY_KEYS.workoutEntries, params],
    queryFn: () => getWorkoutEntries(params),
  })
}

export function useWorkoutEntry(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.workoutEntry(uuid),
    queryFn: () => getWorkoutEntry(uuid),
    enabled: !!uuid,
  })
}

export function useCreateWorkoutEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateWorkoutEntryDto) => createWorkoutEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntries })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Workout entry created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create workout entry', { duration: 3000 })
    },
  })
}

export function useUpdateWorkoutEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateWorkoutEntryDto }) =>
      updateWorkoutEntry(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntries })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntry(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Workout entry updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update workout entry', { duration: 3000 })
    },
  })
}

export function useDeleteWorkoutEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteWorkoutEntry(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntries })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Workout entry deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete workout entry', { duration: 3000 })
    },
  })
}
