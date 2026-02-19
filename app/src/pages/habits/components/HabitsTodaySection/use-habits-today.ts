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
import type { ActivityTodayItem } from '../../interfaces/habbits-tab.interface'

export function useHabitsToday() {
  const [selectedActivityUuid, setSelectedActivityUuid] = useState<string | null>(null)

  const [activeDate, setActiveDate] = useState<string>(() => DateTime.now().toISODate() ?? '')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [filter, setFilter] = useState<ActivityHabbitsQuery>({})

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
    if (filter.date_from || filter.date_to || filter.activity_uuid) return filter
    return { date_from: activeDate, date_to: activeDate }
  }, [activeDate, filter])

  const tomorrowDate = useMemo(() => DateTime.now().plus({ days: 1 }).toISODate() ?? '', [])
  const tomorrowQuery = useMemo<ActivityHabbitsQuery>(() => ({
    date_from: tomorrowDate,
    date_to: tomorrowDate,
    ...(filter.activity_uuid ? { activity_uuid: filter.activity_uuid } : {}),
  }), [tomorrowDate, filter.activity_uuid])

  const showTomorrow = !filter.date_from && !filter.date_to

  const { data: todayHabits = [], isLoading, isError } = useActivityHabbits(query)
  const { data: tomorrowHabits = [] } = useActivityHabbits(tomorrowQuery)

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
    tomorrowHabits,
    showTomorrow,
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
