import { useQuery } from '@tanstack/react-query'
import type { HabitLogsQuery } from '../interfaces/activity-logs.interface'
import { getActivityLogs } from '../services/activity-logs'

const QUERY_KEYS = {
  logs: (query?: HabitLogsQuery) => ['habbits', 'activity-logs', query],
}

export function useActivityLogs(query?: HabitLogsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.logs(query),
    queryFn: () => getActivityLogs(query),
  })
}
