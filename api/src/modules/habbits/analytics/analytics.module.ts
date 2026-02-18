import { Module } from '@nestjs/common'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'
import { AnalyticsService } from './analytics.service'
import { AnalyticsController } from './analytics.controller'
import { AnalyticsJobsService } from './analytics-jobs.service'

@Module({
  imports: [PrismaModule],
  providers: [AnalyticsService, AnalyticsJobsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule { }
