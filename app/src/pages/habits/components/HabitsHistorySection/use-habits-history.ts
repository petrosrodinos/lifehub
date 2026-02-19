import { useMemo } from 'react'
import { useActivityLogs } from '../../../../features/habbits/activity-logs/hooks/use-activity-logs'
import { useActivities } from '../../../../features/activities/hooks/use-activities'
import type { ActivityHabbitsQuery } from '../../../../features/activities/interfaces/activities.interface'
import { groupLogsByDate } from '../../utils/habit-logs.utils'
import type { GroupedActivityLogs } from '../../interfaces/habbits-tab.interface'

export function useHabitsHistory(filter: ActivityHabbitsQuery): {
  groupedSelectedLogs: GroupedActivityLogs[]
  activityNameMap: Record<string, string>
} {
  const hasFilter = !!(filter.activity_uuid || filter.date_from || filter.date_to)

  const logsQuery = useActivityLogs(
    hasFilter
      ? {
          activity_uuid: filter.activity_uuid,
          from_date: filter.date_from,
          to_date: filter.date_to,
        }
      : undefined,
  )

  const { data: activities = [] } = useActivities()

  const groupedSelectedLogs = useMemo(() => groupLogsByDate(logsQuery.data ?? []), [logsQuery.data])

  const activityNameMap = useMemo(
    () => Object.fromEntries(activities.map((a) => [a.uuid, a.name])),
    [activities],
  )

  return { groupedSelectedLogs, activityNameMap }
}
