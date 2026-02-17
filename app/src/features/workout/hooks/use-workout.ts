import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CreateWorkoutDto, UpdateWorkoutDto } from '../interfaces/workout.interface'
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from '../services/workout'

const QUERY_KEYS = {
  workouts: ['workouts'],
  workout: (uuid: string) => ['workouts', uuid],
  workoutSets: ['workout-sets'],
}

export function useWorkouts() {
  return useQuery({
    queryKey: QUERY_KEYS.workouts,
    queryFn: getWorkouts,
  })
}

export function useWorkout(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.workout(uuid),
    queryFn: () => getWorkout(uuid),
    enabled: !!uuid,
  })
}

export function useCreateWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateWorkoutDto) => createWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      toast.success('Workout created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create workout', { duration: 3000 })
    },
  })
}

export function useUpdateWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateWorkoutDto }) =>
      updateWorkout(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workout(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      toast.success('Workout updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update workout', { duration: 3000 })
    },
  })
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteWorkout(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      toast.success('Workout deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete workout', { duration: 3000 })
    },
  })
}
