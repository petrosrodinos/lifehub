import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { toDayKey } from '../utils/habit-date.utils'

@Injectable()
export class LogsRepository {
  constructor(private readonly prisma: PrismaService) { }

  private buildWhere(
    user_uuid: string,
    filters: {
      activity_uuid?: string
      schedule_uuid?: string
      from?: Date
      to?: Date
      completed?: boolean
      skipped?: boolean
    },
  ) {
    return {
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
    }
  }

  countByFilters(
    user_uuid: string,
    filters: {
      activity_uuid?: string
      schedule_uuid?: string
      from?: Date
      to?: Date
      completed?: boolean
      skipped?: boolean
    },
  ) {
    return this.prisma.activityLog.count({
      where: this.buildWhere(user_uuid, filters),
    })
  }

  findByFilters(
    user_uuid: string,
    filters: {
      activity_uuid?: string
      schedule_uuid?: string
      from?: Date
      to?: Date
      completed?: boolean
      skipped?: boolean
      skip?: number
      take?: number
    },
  ) {
    const { skip, take, ...whereFilters } = filters
    const where = this.buildWhere(user_uuid, whereFilters)
    return this.prisma.activityLog.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
      ...(typeof skip === 'number' ? { skip } : {}),
      ...(typeof take === 'number' ? { take } : {}),
      include: {
        activity: true,
        schedule: true,
        occurrence: true,
      },
    })
  }

  async findGroupedByDate(
    user_uuid: string,
    filters: {
      activity_uuid?: string
      schedule_uuid?: string
      from?: Date
      to?: Date
      completed?: boolean
      skipped?: boolean
      skip?: number
      take?: number
    },
  ): Promise<Array<{ date: string; logs: Awaited<ReturnType<LogsRepository['findByFilters']>> }>> {
    const rows = await this.findByFilters(user_uuid, filters)
    const grouped = new Map<string, Awaited<ReturnType<LogsRepository['findByFilters']>>>()
    for (const log of rows) {
      const key = toDayKey(log.created_at)
      const list = grouped.get(key) ?? []
      list.push(log)
      grouped.set(key, list)
    }
    return Array.from(grouped.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([date, dateLogs]) => ({
        date,
        logs: dateLogs.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
      }))
  }
}
