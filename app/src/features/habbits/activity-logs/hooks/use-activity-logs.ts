import { useQuery } from '@tanstack/react-query'
import type { ActivityLogsQuery } from '../interfaces/activity-logs.interface'
import { getActivityLogs, getActivityLogsGrouped } from '../services/activity-logs'

const QUERY_KEYS = {
  logs: (query?: ActivityLogsQuery) => ['habbits', 'activity-logs', query],
  logsGrouped: (query?: ActivityLogsQuery) => ['habbits', 'activity-logs', 'grouped', query],
}

export function useActivityLogs(query?: ActivityLogsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.logs(query),
    queryFn: () => getActivityLogs(query),
  })
}

export function useActivityLogsGrouped(query?: ActivityLogsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.logsGrouped(query),
    queryFn: () => getActivityLogsGrouped(query),
  })
}
