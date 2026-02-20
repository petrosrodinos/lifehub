import { Injectable } from '@nestjs/common'
import { LogsRepository } from '../repositories/logs.repository'
import { ActivityLogsQueryType } from './schemas/activity-logs-query.schema'

@Injectable()
export class ActivityLogsService {
  constructor(private readonly logsRepository: LogsRepository) { }

  async findAll(
    user_uuid: string,
    query: ActivityLogsQueryType,
  ): Promise<{ data: Awaited<ReturnType<LogsRepository['findByFilters']>>; total: number; page: number; page_size: number }> {
    const filters = {
      activity_uuid: query.activity_uuid,
      schedule_uuid: query.schedule_uuid,
      from: query.from_date,
      to: query.to_date,
      completed: query.completed,
      skipped: query.skipped,
    }
    const page = query.page ?? 1
    const page_size = query.page_size ?? 20
    const [data, total] = await Promise.all([
      this.logsRepository.findByFilters(user_uuid, {
        ...filters,
        skip: (page - 1) * page_size,
        take: page_size,
      }),
      this.logsRepository.countByFilters(user_uuid, filters),
    ])
    return { data, total, page, page_size }
  }

  async findAllGrouped(
    user_uuid: string,
    query: ActivityLogsQueryType,
  ): Promise<{
    data: Awaited<ReturnType<LogsRepository['findGroupedByDate']>>
    total: number
    page: number
    page_size: number
  }> {
    const filters = {
      activity_uuid: query.activity_uuid,
      schedule_uuid: query.schedule_uuid,
      from: query.from_date,
      to: query.to_date,
      completed: query.completed,
      skipped: query.skipped,
    }
    const page = query.page ?? 1
    const page_size = query.page_size ?? 20
    const [data, total] = await Promise.all([
      this.logsRepository.findGroupedByDate(user_uuid, {
        ...filters,
        skip: (page - 1) * page_size,
        take: page_size,
      }),
      this.logsRepository.countByFilters(user_uuid, filters),
    ])
    return { data, total, page, page_size }
  }
}
