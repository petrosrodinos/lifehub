import { useState, useMemo, useCallback } from 'react'
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
  setPage: (page: number) => void
} {
  const [page, setPageState] = useState(1)
  const hasFilter = !!(filter.activity_uuid || filter.date_from || filter.date_to)
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

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage)
  }, [])

  const response = groupedQuery.data
  const groupedSelectedLogs = useMemo(
    () => (Array.isArray(response?.data) ? response.data : []),
    [response?.data],
  )
  const total = typeof response?.total === 'number' ? response.total : 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return {
    groupedSelectedLogs,
    total,
    page,
    pageSize,
    totalPages,
    setPage,
  }
}
