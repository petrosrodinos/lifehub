import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { WorkoutSet } from '../interfaces/workout-sets.interface'
import { createWorkoutSet, reorderWorkoutSets } from '../services/workout-sets'
import { workoutSetToCreateDto } from '../utils/workout-set-to-create-dto.utils'

const QUERY_KEYS = {
  workoutSets: ['workout-sets'],
  workoutEntries: ['workout-entries'],
  workouts: ['workouts'],
  exercises: ['exercises'],
}

type DuplicateWorkoutSetInput = {
  set: WorkoutSet
  entrySets: WorkoutSet[]
}

export function useDuplicateWorkoutSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ set, entrySets }: DuplicateWorkoutSetInput) => {
      const reorderUpdates = entrySets
        .filter((s) => s.order > set.order)
        .map((s) => ({ uuid: s.uuid, order: s.order + 1 }))

      if (reorderUpdates.length > 0) {
        await reorderWorkoutSets(reorderUpdates)
      }

      return createWorkoutSet(workoutSetToCreateDto(set, set.order + 1))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutSets })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workoutEntries })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workouts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.exercises })
      toast.success('Set duplicated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to duplicate set', { duration: 3000 })
    },
  })
}
