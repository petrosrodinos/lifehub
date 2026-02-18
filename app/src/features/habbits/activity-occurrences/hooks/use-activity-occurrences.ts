import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { CompleteOccurrenceDto, SkipOccurrenceDto } from '../interfaces/activity-occurrences.interface'
import { completeActivityOccurrence, skipActivityOccurrence } from '../services/activity-occurrences'

export function useCompleteActivityOccurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: CompleteOccurrenceDto }) =>
      completeActivityOccurrence(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habbits'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      toast.success('Occurrence completed', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to complete occurrence', { duration: 3000 })
    },
  })
}

export function useSkipActivityOccurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: SkipOccurrenceDto }) =>
      skipActivityOccurrence(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habbits'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      toast.success('Occurrence skipped', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to skip occurrence', { duration: 3000 })
    },
  })
}
