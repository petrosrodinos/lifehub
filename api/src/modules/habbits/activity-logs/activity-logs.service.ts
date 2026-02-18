import { Injectable } from '@nestjs/common'
import { LogsRepository } from '../repositories/logs.repository'
import { ActivityLogsQueryType } from './schemas/activity-logs-query.schema'

@Injectable()
export class ActivityLogsService {
  constructor(private readonly logsRepository: LogsRepository) { }

  findAll(user_uuid: string, query: ActivityLogsQueryType) {
    return this.logsRepository.findByFilters(user_uuid, {
      activity_uuid: query.activity_uuid,
      schedule_uuid: query.schedule_uuid,
      from: query.from_date,
      to: query.to_date,
      completed: query.completed,
      skipped: query.skipped,
    })
  }
}
