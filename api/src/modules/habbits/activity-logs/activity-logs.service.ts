import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { ActivityLogsQueryType } from './schemas/activity-logs-query.schema'
import { buildActivityLogWhere, type ActivityLogFilters } from './helpers/activity-logs.helper'
import { toDayKey } from '../utils/habit-date.utils'
import { ActivityLogGrouped, ActivityLogResponse, ActivityLogWithRelations } from './interfaces/activity-logs.interfaces'

@Injectable()
export class ActivityLogsService {
  private readonly activityLogInclude = {
    activity: true,
    schedule: true,
    occurrence: true,
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
    const where = buildActivityLogWhere(user_uuid, filters)
    const rows = await this.prisma.activityLog.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip,
      take: page_size,
      include: this.activityLogInclude,
    })
    const grouped = new Map<string, ActivityLogWithRelations[]>()

    for (const log of rows) {
      const key = toDayKey(log.created_at)
      const list = grouped.get(key) ?? []
      list.push(log)
      grouped.set(key, list)
    }

    const data = Array.from(grouped.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([date, dateLogs]) => ({
        date,
        logs: dateLogs.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
      }))
    const total = await this.prisma.activityLog.count({ where })

    return { data, total, page, page_size }
  }
}
