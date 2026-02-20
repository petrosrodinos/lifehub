import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { ActivityLogsService } from './activity-logs.service'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe'
import { ActivityLogsQuerySchema, ActivityLogsQueryType } from './schemas/activity-logs-query.schema'

@Controller('logs')
@UseGuards(JwtGuard)
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ActivityLogsQuerySchema)) query: ActivityLogsQueryType,
  ) {
    return this.activityLogsService.findAll(user_uuid, query)
  }

  @Get('grouped')
  @HttpCode(HttpStatus.OK)
  findAllGrouped(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ActivityLogsQuerySchema)) query: ActivityLogsQueryType,
  ) {
    return this.activityLogsService.findAllGrouped(user_uuid, query)
  }
}
