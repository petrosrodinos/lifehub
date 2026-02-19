import { Module } from '@nestjs/common'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'
import { AnalyticsService } from './analytics.service'
import { AnalyticsJobsService } from './analytics-jobs.service'

@Module({
  imports: [PrismaModule],
  providers: [AnalyticsService, AnalyticsJobsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule { }
