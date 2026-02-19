import { useMemo } from 'react'
import { DateTime } from 'luxon'
import { useActivityHabbits } from '../../../../features/activities/hooks/use-activities'
import { OccurrenceStatuses } from '../../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'

export function useHabitsHeader() {
  const activitiesQuery = useActivityHabbits()
  const todayHabits = activitiesQuery.data ?? []

  const completedToday = useMemo(
    () => todayHabits.filter((h) => h.status === OccurrenceStatuses.COMPLETED).length,
    [todayHabits],
  )

  const totalToday = todayHabits.length

  const dateLabel = useMemo(() => DateTime.now().toFormat('EEEE, MMMM d'), [])

  return {
    dateLabel,
    completedToday,
    totalToday,
  }
}
