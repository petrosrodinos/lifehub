import { useQuery } from '@tanstack/react-query'
import type { ActivityLogsQuery } from '../interfaces/activity-logs.interface'
import { getActivityLogs } from '../services/activity-logs'

const QUERY_KEYS = {
  logs: (query?: ActivityLogsQuery) => ['habbits', 'activity-logs', query],
}

export function useActivityLogs(query?: ActivityLogsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.logs(query),
    queryFn: () => getActivityLogs(query),
  })
}
