import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'

@Injectable()
export class LogsRepository {
  constructor(private readonly prisma: PrismaService) { }

  findByFilters(
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
    return this.prisma.activityLog.findMany({
      where: {
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
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        activity: true,
        schedule: true,
        occurrence: true,
      },
    })
  }
}
