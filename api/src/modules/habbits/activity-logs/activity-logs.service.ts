import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { ActivityLogsQueryType } from './schemas/activity-logs-query.schema'
import { buildActivityLogWhere, buildOccurrenceWhere, type ActivityLogFilters } from './helpers/activity-logs.helper'
import { toDayKey } from '../utils/habit-date.utils'
import {
  type ActivityLogGrouped,
  type ActivityLogResponse,
  type ActivityLogWithRelations,
  type GroupedLogEntry,
  type OccurrenceWithRelations,
} from './interfaces/activity-logs.interfaces'

@Injectable()
export class ActivityLogsService {
  private readonly activityLogInclude = {
    activity: true,
    schedule: true,
    occurrence: true,
  } as const

  private readonly occurrenceInclude = {
    activity: true,
    schedule: true,
    log: true,
  } as const

  constructor(private readonly prisma: PrismaService) { }

  async findAll(
    user_uuid: string,
    query: ActivityLogsQueryType,
  ): Promise<ActivityLogResponse> {
    const filters: ActivityLogFilters = {
      activity_uuid: query.activity_uuid,
      schedule_uuid: query.schedule_uuid,
      from: query.from_date,
      to: query.to_date,
      completed: query.completed,
      skipped: query.skipped,
    }

    const page = query.page ?? 1
    const page_size = query.page_size ?? 20
    const skip = (page - 1) * page_size
    const where = buildActivityLogWhere(user_uuid, filters)
    const [data, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: page_size,
        include: this.activityLogInclude,
      }),
      this.prisma.activityLog.count({ where }),
    ])

    return { data, total, page, page_size }
  }

  async findAllGrouped(
    user_uuid: string,
    query: ActivityLogsQueryType,
  ): Promise<ActivityLogGrouped> {
    const filters: ActivityLogFilters = {
      activity_uuid: query.activity_uuid,
      schedule_uuid: query.schedule_uuid,
      from: query.from_date,
      to: query.to_date,
      completed: query.completed,
      skipped: query.skipped,
    }

    const page = query.page ?? 1
    const page_size = query.page_size ?? 20
    const skip = (page - 1) * page_size
    const where = buildOccurrenceWhere(user_uuid, filters)

    const [rows, total] = await Promise.all([
      this.prisma.activityOccurrence.findMany({
        where,
        orderBy: { scheduled_for: 'desc' },
        skip,
        take: page_size,
        include: this.occurrenceInclude,
      }),
      this.prisma.activityOccurrence.count({ where }),
    ])

    const entries = rows.map(mapOccurrenceToGroupedEntry)

    const grouped = new Map<string, GroupedLogEntry[]>()

    for (const entry of entries) {
      const key = toDayKey(entry.scheduled_for)
      const list = grouped.get(key) ?? []
      list.push(entry)
      grouped.set(key, list)
    }

    const data = Array.from(grouped.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([date, dateLogs]) => ({
        date,
        logs: dateLogs.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
      }))

    return { data, total, page, page_size }
  }
}

function mapOccurrenceToGroupedEntry(occurrence: OccurrenceWithRelations): GroupedLogEntry {
  const log = occurrence.log

  return {
    uuid: log?.uuid ?? occurrence.uuid,
    user_uuid: occurrence.user_uuid,
    activity_uuid: occurrence.activity_uuid,
    schedule_uuid: occurrence.schedule_uuid,
    occurrence_uuid: occurrence.uuid,
    occurrence_status: occurrence.status,
    snapshot_target_type: log?.snapshot_target_type ?? null,
    snapshot_target_value: log?.snapshot_target_value ?? null,
    snapshot_target_unit: log?.snapshot_target_unit ?? null,
    snapshot_target_unit_label: log?.snapshot_target_unit_label ?? null,
    value: log?.value ?? null,
    completed: log?.completed ?? false,
    completed_at: log?.completed_at ?? null,
    skipped: log?.skipped ?? false,
    skip_reason: log?.skip_reason ?? null,
    notes: log?.notes ?? null,
    scheduled_for: occurrence.scheduled_for,
    created_at: log?.created_at ?? occurrence.scheduled_for,
    updated_at: log?.updated_at ?? occurrence.updated_at,
    activity: occurrence.activity,
    schedule: occurrence.schedule,
  }
}
