import { DateTime } from 'luxon'
import type { ActivityLog } from '../../../features/habbits/activity-logs/interfaces/activity-logs.interface'
import type { GroupedActivityLogs } from '../interfaces/habbits-tab.interface'

export function groupLogsByDate(logs: ActivityLog[]): GroupedActivityLogs[] {
  const grouped = new Map<string, ActivityLog[]>()

  logs.forEach((log) => {
    const key = DateTime.fromISO(log.created_at).toFormat('yyyy-LL-dd')
    const current = grouped.get(key) ?? []
    current.push(log)
    grouped.set(key, current)
  })

  return Array.from(grouped.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, dateLogs]) => ({
      date,
      logs: dateLogs.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
    }))
}
