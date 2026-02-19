import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { AnalyticsService } from './analytics.service'

@UseGuards(JwtGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Get('overview')
  @HttpCode(HttpStatus.OK)
  getOverview(@CurrentUser('user_uuid') user_uuid: string) {
    return this.analyticsService.getOverview(user_uuid)
  }
}
