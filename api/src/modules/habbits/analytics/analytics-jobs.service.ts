import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { AnalyticsService } from './analytics.service'

@Injectable()
export class AnalyticsJobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analyticsService: AnalyticsService,
  ) { }

  @Cron(CronExpression.EVERY_WEEK)
  async warmOverviewCache() {
    const users = await this.prisma.user.findMany({
      select: { uuid: true },
    })

    for (const user of users) {
      await this.analyticsService.getOverview(user.uuid)
    }
  }
}
