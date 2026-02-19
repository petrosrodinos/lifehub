import { useState, useMemo, useCallback } from 'react'
import { DateTime } from 'luxon'
import toast from 'react-hot-toast'
import { useActivityHabbits } from '../../../../features/activities/hooks/use-activities'
import type { ActivityHabbitsQuery } from '../../../../features/activities/interfaces/activities.interface'
import { OccurrenceStatuses } from '../../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import {
  useCompleteActivityOccurrence,
  useSkipActivityOccurrence,
} from '../../../../features/habbits/activity-occurrences/hooks/use-activity-occurrences'
import { useHabitsPageContext } from '../../context/habits-page.context'
import type { ActivityTodayItem } from '../../interfaces/habbits-tab.interface'

export interface HabitsTodayFilter {
  dateFrom: string
  dateTo: string
  activityUuid: string
}

const DEFAULT_FILTER: HabitsTodayFilter = { dateFrom: '', dateTo: '', activityUuid: '' }

export function useHabitsToday() {
  const { selectedActivityUuid, setSelectedActivityUuid } = useHabitsPageContext()

  const [activeDate, setActiveDate] = useState<string>(() => DateTime.now().toISODate() ?? '')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [filter, setFilter] = useState<HabitsTodayFilter>(DEFAULT_FILTER)

  const goToPreviousDay = useCallback(() => {
    setActiveDate((prev) => DateTime.fromISO(prev).minus({ days: 1 }).toISODate() ?? prev)
  }, [])

  const goToNextDay = useCallback(() => {
    setActiveDate((prev) => DateTime.fromISO(prev).plus({ days: 1 }).toISODate() ?? prev)
  }, [])

  const activeDateLabel = useMemo(() => {
    const dt = DateTime.fromISO(activeDate)
    const diff = Math.round(dt.startOf('day').diff(DateTime.now().startOf('day'), 'days').days)
    if (diff === 0) return 'Today'
    if (diff === -1) return 'Yesterday'
    if (diff === 1) return 'Tomorrow'
    return dt.toFormat('ccc, LLL d')
  }, [activeDate])

  const query = useMemo<ActivityHabbitsQuery>(() => {
    const result: ActivityHabbitsQuery = {}
    if (filter.dateFrom || filter.dateTo) {
      if (filter.dateFrom) result.date_from = filter.dateFrom
      if (filter.dateTo) result.date_to = filter.dateTo
    } else {
      result.date_from = activeDate
      result.date_to = activeDate
    }
    if (filter.activityUuid) result.activity_uuid = filter.activityUuid
    return result
  }, [activeDate, filter])

  const { data: todayHabits = [], isLoading, isError } = useActivityHabbits(query)

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
    isLoading,
    hasError: isError,
    isActionPending: completeMutation.isPending || skipMutation.isPending,
    selectedActivityUuid,
    setSelectedActivityUuid,
    activeActionItem,
    setActiveActionItem,
    completeOccurrence,
    skipOccurrence,
    activeDate,
    activeDateLabel,
    goToPreviousDay,
    goToNextDay,
    isFiltersOpen,
    setIsFiltersOpen,
    setFilter,
  }
}
