import { Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards } from '@nestjs/common'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { AnalyticsService } from './analytics.service'
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe'
import { ActivityProgressQuerySchema, ActivityProgressQueryType } from './schemas/activity-progress-query.schema'

@UseGuards(JwtGuard)
@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Get('activities/:activity_uuid/progress')
  @HttpCode(HttpStatus.OK)
  getActivityProgress(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('activity_uuid') activity_uuid: string,
    @Query(new ZodValidationPipe(ActivityProgressQuerySchema)) query: ActivityProgressQueryType,
  ) {
    return this.analyticsService.getActivityProgress(user_uuid, activity_uuid, query.range)
  }

  @Get('analytics/overview')
  @HttpCode(HttpStatus.OK)
  getOverview(@CurrentUser('user_uuid') user_uuid: string) {
    return this.analyticsService.getOverview(user_uuid)
  }
}
