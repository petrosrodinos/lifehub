import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { OccurrenceStatuses } from '../interfaces/activity-occurrences.interface'
import { completeActivityOccurrence, skipActivityOccurrence } from '../services/activity-occurrences'
import { patchOccurrenceStatus } from '../utils/activity-occurrences.utils'
import type { ActivityHabitItem } from '../../../activities/interfaces/activities.interface'

const OCCURRENCES_KEY = ['habbits', 'activities', 'occurrences']
const LOGS_KEY = ['habbits', 'activity-logs']
const OVERVIEW_KEY = ['habbits', 'analytics', 'overview']

type CompleteOccurrenceVars = {
  occurrenceUuid: string
  value?: number
  activityUuid?: string
}

export function useCompleteActivityOccurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ occurrenceUuid, value }: CompleteOccurrenceVars) =>
      completeActivityOccurrence(occurrenceUuid, value !== undefined ? { value } : {}),
    onMutate: async ({ occurrenceUuid }) => {
      await queryClient.cancelQueries({ queryKey: OCCURRENCES_KEY })
      const previousItems = queryClient.getQueryData<ActivityHabitItem[]>(OCCURRENCES_KEY)
      queryClient.setQueryData<ActivityHabitItem[]>(
        OCCURRENCES_KEY,
        patchOccurrenceStatus(previousItems, { occurrenceUuid, status: OccurrenceStatuses.COMPLETED }),
      )
      return { previousItems }
    },
    onSuccess: () => {
      toast.success('Occurrence completed', { duration: 1600 })
    },
    onError: (error: Error, _, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(OCCURRENCES_KEY, context.previousItems)
      }
      toast.error(error.message || 'Could not complete occurrence')
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: OCCURRENCES_KEY })
      queryClient.invalidateQueries({ queryKey: LOGS_KEY })
      queryClient.invalidateQueries({ queryKey: OVERVIEW_KEY })
      if (variables.activityUuid) {
        queryClient.invalidateQueries({
          queryKey: ['habbits', 'activities', variables.activityUuid, 'progress-summary'],
        })
      }
    },
  })
}

type SkipOccurrenceVars = {
  occurrenceUuid: string
  skipReason?: string
  activityUuid?: string
}

export function useSkipActivityOccurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ occurrenceUuid, skipReason }: SkipOccurrenceVars) =>
      skipActivityOccurrence(occurrenceUuid, skipReason ? { skip_reason: skipReason } : {}),
    onMutate: async ({ occurrenceUuid }) => {
      await queryClient.cancelQueries({ queryKey: OCCURRENCES_KEY })
      const previousItems = queryClient.getQueryData<ActivityHabitItem[]>(OCCURRENCES_KEY)
      queryClient.setQueryData<ActivityHabitItem[]>(
        OCCURRENCES_KEY,
        patchOccurrenceStatus(previousItems, { occurrenceUuid, status: OccurrenceStatuses.SKIPPED }),
      )
      return { previousItems }
    },
    onSuccess: () => {
      toast.success('Occurrence skipped', { duration: 1600 })
    },
    onError: (error: Error, _, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(OCCURRENCES_KEY, context.previousItems)
      }
      toast.error(error.message || 'Could not skip occurrence')
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: OCCURRENCES_KEY })
      queryClient.invalidateQueries({ queryKey: LOGS_KEY })
      queryClient.invalidateQueries({ queryKey: OVERVIEW_KEY })
      if (variables.activityUuid) {
        queryClient.invalidateQueries({
          queryKey: ['habbits', 'activities', variables.activityUuid, 'progress-summary'],
        })
      }
    },
  })
}
