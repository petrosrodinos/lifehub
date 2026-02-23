import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CreateExerciseDto, UpdateExerciseDto } from '../interfaces/exercises.interface'
import {
  createExercise,
  deleteExercise,
  getExercise,
  getExercises,
  updateExercise,
} from '../services/exercises'

const QUERY_KEYS = {
  exercises: ['exercises'],
  exercise: (uuid: string) => ['exercises', uuid],
  muscleGroups: ['muscle-groups'],
  workoutSets: ['workout-sets'],
}

export function useExercises() {
  return useQuery({
    queryKey: QUERY_KEYS.exercises,
    queryFn: getExercises,
  })
}

export function useExercise(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.exercise(uuid),
    queryFn: () => getExercise(uuid),
    enabled: !!uuid,
  })
}

export function useCreateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExerciseDto) => createExercise(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.muscleGroups })
      toast.success('Exercise created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create exercise', { duration: 3000 })
    },
  })
}

export function useUpdateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExerciseDto }) =>
      updateExercise(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercise(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.muscleGroups })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      toast.success('Exercise updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update exercise', { duration: 3000 })
    },
  })
}

export function useDeleteExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteExercise(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      toast.success('Exercise deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete exercise', { duration: 3000 })
    },
  })
}
