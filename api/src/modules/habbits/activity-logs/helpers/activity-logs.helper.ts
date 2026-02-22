import { OccurrenceStatus, type Prisma } from '@/generated/prisma'

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

export const buildOccurrenceWhere = (
  user_uuid: string,
  filters: ActivityLogFilters,
): Prisma.ActivityOccurrenceWhereInput => {
  const hasCompletedFilter = typeof filters.completed === 'boolean'
  const hasSkippedFilter = typeof filters.skipped === 'boolean'

  let statusCondition: Prisma.ActivityOccurrenceWhereInput['status']

  if (!hasCompletedFilter && !hasSkippedFilter) {
    statusCondition = { in: [OccurrenceStatus.COMPLETED, OccurrenceStatus.SKIPPED, OccurrenceStatus.FAILED] }
  } else {
    const statuses: OccurrenceStatus[] = []

    if (filters.completed === true) statuses.push(OccurrenceStatus.COMPLETED)
    if (filters.skipped === true) statuses.push(OccurrenceStatus.SKIPPED)
    if (filters.completed === false && filters.skipped === false) statuses.push(OccurrenceStatus.FAILED)

    statusCondition = statuses.length > 0
      ? { in: statuses }
      : { in: [OccurrenceStatus.COMPLETED, OccurrenceStatus.SKIPPED, OccurrenceStatus.FAILED] }
  }

  return {
    user_uuid,
    ...(filters.activity_uuid ? { activity_uuid: filters.activity_uuid } : {}),
    ...(filters.schedule_uuid ? { schedule_uuid: filters.schedule_uuid } : {}),
    status: statusCondition,
    ...(filters.from || filters.to
      ? {
        scheduled_for: {
          ...(filters.from ? { gte: filters.from } : {}),
          ...(filters.to ? { lte: filters.to } : {}),
        },
      }
      : {}),
  }
}

