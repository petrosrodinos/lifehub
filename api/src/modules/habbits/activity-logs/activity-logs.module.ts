import { Module } from '@nestjs/common'
import { ActivityLogsService } from './activity-logs.service'
import { ActivityLogsController } from './activity-logs.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'
import { LogsRepository } from '../repositories/logs.repository'

@Module({
  imports: [PrismaModule],
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService, LogsRepository],
})
export class ActivityLogsModule { }
