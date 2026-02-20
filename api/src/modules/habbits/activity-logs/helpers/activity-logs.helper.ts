export type ActivityLogFilters = {
  activity_uuid?: string
  schedule_uuid?: string
  from?: Date
  to?: Date
  completed?: boolean
  skipped?: boolean
}

export const buildActivityLogWhere = (user_uuid: string, filters: ActivityLogFilters) => ({
  user_uuid,
  ...(filters.activity_uuid ? { activity_uuid: filters.activity_uuid } : {}),
  ...(filters.schedule_uuid ? { schedule_uuid: filters.schedule_uuid } : {}),
  ...(typeof filters.completed === 'boolean' ? { completed: filters.completed } : {}),
  ...(typeof filters.skipped === 'boolean' ? { skipped: filters.skipped } : {}),
  ...(filters.from || filters.to
    ? {
      created_at: {
        ...(filters.from ? { gte: filters.from } : {}),
        ...(filters.to ? { lte: filters.to } : {}),
      },
    }
    : {}),
})
