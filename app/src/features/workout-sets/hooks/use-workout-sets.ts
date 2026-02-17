import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateWorkoutSetDto,
  UpdateWorkoutSetDto,
} from '../interfaces/workout-sets.interface'
import {
  createWorkoutSet,
  deleteWorkoutSet,
  getWorkoutSet,
  getWorkoutSets,
  updateWorkoutSet,
} from '../services/workout-sets'

const QUERY_KEYS = {
  workoutSets: ['workout-sets'],
  workoutSet: (uuid: string) => ['workout-sets', uuid],
  workoutEntries: ['workout-entries'],
  workouts: ['workouts'],
  exercises: ['exercises'],
}

export function useWorkoutSets() {
  return useQuery({
    queryKey: QUERY_KEYS.workoutSets,
    queryFn: getWorkoutSets,
  })
}

export function useWorkoutSet(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.workoutSet(uuid),
    queryFn: () => getWorkoutSet(uuid),
    enabled: !!uuid,
  })
}

export function useCreateWorkoutSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateWorkoutSetDto) => createWorkoutSet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntries })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Workout set created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create workout set', { duration: 3000 })
    },
  })
}

export function useUpdateWorkoutSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateWorkoutSetDto }) =>
      updateWorkoutSet(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSet(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntries })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Workout set updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update workout set', { duration: 3000 })
    },
  })
}

export function useDeleteWorkoutSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteWorkoutSet(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntries })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Workout set deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete workout set', { duration: 3000 })
    },
  })
}
