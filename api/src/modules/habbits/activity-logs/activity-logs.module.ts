import { Module } from '@nestjs/common'
import { ActivityLogsService } from './activity-logs.service'
import { ActivityLogsController } from './activity-logs.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService],
})
export class ActivityLogsModule { }
