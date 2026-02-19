import { useMemo } from 'react'
import { useActivityLogs } from '../../../../features/habbits/activity-logs/hooks/use-activity-logs'
import { useHabitsPageContext } from '../../context/habits-page.context'
import { groupLogsByDate } from '../../utils/habit-logs.utils'
import type { GroupedActivityLogs } from '../../interfaces/habbits-tab.interface'

export function useHabitsHistory(): { groupedSelectedLogs: GroupedActivityLogs[] } {
  const { selectedActivityUuid } = useHabitsPageContext()
  const logsQuery = useActivityLogs(
    selectedActivityUuid ? { activity_uuid: selectedActivityUuid } : undefined,
  )
  const selectedLogs = logsQuery.data ?? []

  const groupedSelectedLogs = useMemo(() => groupLogsByDate(selectedLogs), [selectedLogs])

  return { groupedSelectedLogs }
}
