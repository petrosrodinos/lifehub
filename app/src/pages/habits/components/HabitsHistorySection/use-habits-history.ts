import { useActivityLogsGrouped } from '../../../../features/habbits/activity-logs/hooks/use-activity-logs'
import type { ActivityHabbitsQuery } from '../../../../features/activities/interfaces/activities.interface'
import type { GroupedActivityLogs } from '../../interfaces/habbits-tab.interface'

const DEFAULT_PAGE_SIZE = 8

export function useHabitsHistory(filter: ActivityHabbitsQuery): {
  groupedSelectedLogs: GroupedActivityLogs[]
  total: number
  page: number
  pageSize: number
  totalPages: number
} {
  const hasFilter = !!(filter.activity_uuid || filter.date_from || filter.date_to)
  const page = filter.page ?? 1
  const pageSize = filter.page_size ?? DEFAULT_PAGE_SIZE

  const groupedQuery = useActivityLogsGrouped(
    hasFilter
      ? {
          activity_uuid: filter.activity_uuid,
          from_date: filter.date_from,
          to_date: filter.date_to,
          page,
          page_size: pageSize,
        }
      : { page, page_size: pageSize },
  )

  const response = groupedQuery.data
  const groupedSelectedLogs = Array.isArray(response?.data) ? response.data : []
  const total = typeof response?.total === 'number' ? response.total : 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return {
    groupedSelectedLogs,
    total,
    page,
    pageSize,
    totalPages,
  }
}
