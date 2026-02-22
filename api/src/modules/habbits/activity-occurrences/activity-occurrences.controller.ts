import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { ActivityOccurrencesService } from './activity-occurrences.service'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { CompleteOccurrenceDto } from './dto/complete-occurrence.dto'
import { SkipOccurrenceDto } from './dto/skip-occurrence.dto'

@ApiTags('Activity Occurrences')
@ApiBearerAuth()
@Controller('occurrences')
@UseGuards(JwtGuard)
export class ActivityOccurrencesController {
  constructor(private readonly activityOccurrencesService: ActivityOccurrencesService) { }

  @Post(':uuid/complete')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Mark an activity occurrence as completed' })
  @ApiParam({ name: 'uuid', description: 'Activity occurrence UUID' })
  @ApiResponse({ status: 201, description: 'Occurrence completed successfully' })
  @ApiResponse({ status: 404, description: 'Occurrence not found' })
  complete(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: CompleteOccurrenceDto,
  ) {
    return this.activityOccurrencesService.completeOccurrence(user_uuid, uuid, dto)
  }

  @Post(':uuid/skip')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Skip an activity occurrence' })
  @ApiParam({ name: 'uuid', description: 'Activity occurrence UUID' })
  @ApiResponse({ status: 201, description: 'Occurrence skipped successfully' })
  @ApiResponse({ status: 404, description: 'Occurrence not found' })
  skip(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: SkipOccurrenceDto,
  ) {
    return this.activityOccurrencesService.skipOccurrence(user_uuid, uuid, dto)
  }
}
