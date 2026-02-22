import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { ActivityLogsService } from './activity-logs.service'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe'
import { ActivityLogsQuerySchema, ActivityLogsQueryType } from './schemas/activity-logs-query.schema'

@ApiTags('Activity Logs')
@ApiBearerAuth()
@Controller('logs')
@UseGuards(JwtGuard)
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all activity logs with optional filters' })
  @ApiResponse({ status: 200, description: 'Activity logs retrieved successfully' })
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ActivityLogsQuerySchema)) query: ActivityLogsQueryType,
  ) {
    return this.activityLogsService.findAll(user_uuid, query)
  }

  @Get('grouped')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get activity logs grouped by activity' })
  @ApiResponse({ status: 200, description: 'Grouped activity logs retrieved successfully' })
  findAllGrouped(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ActivityLogsQuerySchema)) query: ActivityLogsQueryType,
  ) {
    return this.activityLogsService.findAllGrouped(user_uuid, query)
  }
}
