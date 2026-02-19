import { useState } from 'react'
import toast from 'react-hot-toast'
import { useActivityHabbits } from '../../../../features/activities/hooks/use-activities'
import { OccurrenceStatuses } from '../../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import {
  useCompleteActivityOccurrence,
  useSkipActivityOccurrence,
} from '../../../../features/habbits/activity-occurrences/hooks/use-activity-occurrences'
import { useHabitsPageContext } from '../../context/habits-page.context'
import type { ActivityTodayItem } from '../../interfaces/habbits-tab.interface'

export function useHabitsToday() {
  const { selectedActivityUuid, setSelectedActivityUuid } = useHabitsPageContext()
  const activitiesQuery = useActivityHabbits()
  const todayHabits: ActivityTodayItem[] = activitiesQuery.data ?? []

  const [activeActionItem, setActiveActionItem] = useState<ActivityTodayItem | null>(null)

  const completeMutation = useCompleteActivityOccurrence()
  const skipMutation = useSkipActivityOccurrence()

  async function completeOccurrence(occurrenceUuid: string, status: string, value?: number, activityUuid?: string) {
    if (status !== OccurrenceStatuses.PENDING) {
      toast('This occurrence is already completed')
      return
    }
    await completeMutation.mutateAsync({ occurrenceUuid, value, activityUuid })
  }

  async function skipOccurrence(occurrenceUuid: string, status: string, activityUuid?: string) {
    if (status !== OccurrenceStatuses.PENDING) {
      toast('Skipping after completion is not allowed')
      return
    }
    await skipMutation.mutateAsync({ occurrenceUuid, activityUuid })
  }

  return {
    todayHabits,
    isLoading: activitiesQuery.isLoading,
    hasError: activitiesQuery.isError,
    isActionPending: completeMutation.isPending || skipMutation.isPending,
    selectedActivityUuid,
    setSelectedActivityUuid,
    activeActionItem,
    setActiveActionItem,
    completeOccurrence,
    skipOccurrence,
  }
}
