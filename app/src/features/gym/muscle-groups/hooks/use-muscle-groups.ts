import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateMuscleGroupDto,
  UpdateMuscleGroupDto,
} from '../interfaces/muscle-groups.interface'
import {
  createMuscleGroup,
  deleteMuscleGroup,
  getMuscleGroup,
  getMuscleGroups,
  updateMuscleGroup,
} from '../services/muscle-groups'

const QUERY_KEYS = {
  muscleGroups: ['muscle-groups'],
  muscleGroup: (uuid: string) => ['muscle-groups', uuid],
  exercises: ['exercises'],
  workoutSets: ['workout-sets'],
}

export function useMuscleGroups() {
  return useQuery({
    queryKey: QUERY_KEYS.muscleGroups,
    queryFn: getMuscleGroups,
  })
}

export function useMuscleGroup(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.muscleGroup(uuid),
    queryFn: () => getMuscleGroup(uuid),
    enabled: !!uuid,
  })
}

export function useCreateMuscleGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMuscleGroupDto) => createMuscleGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.muscleGroups })
      toast.success('Muscle group created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create muscle group', { duration: 3000 })
    },
  })
}

export function useUpdateMuscleGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateMuscleGroupDto }) =>
      updateMuscleGroup(uuid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.muscleGroups })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.muscleGroup(variables.uuid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Muscle group updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update muscle group', { duration: 3000 })
    },
  })
}

export function useDeleteMuscleGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteMuscleGroup(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.muscleGroups })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      toast.success('Muscle group deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete muscle group', { duration: 3000 })
    },
  })
}
