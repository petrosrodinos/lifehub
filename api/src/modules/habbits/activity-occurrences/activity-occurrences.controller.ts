import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { ActivityOccurrencesService } from './activity-occurrences.service'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { CompleteOccurrenceDto } from './dto/complete-occurrence.dto'
import { SkipOccurrenceDto } from './dto/skip-occurrence.dto'

@Controller('occurrences')
@UseGuards(JwtGuard)
export class ActivityOccurrencesController {
  constructor(private readonly activityOccurrencesService: ActivityOccurrencesService) { }

  @Post(':uuid/complete')
  @HttpCode(HttpStatus.CREATED)
  complete(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: CompleteOccurrenceDto,
  ) {
    return this.activityOccurrencesService.completeOccurrence(user_uuid, uuid, dto)
  }

  @Post(':uuid/skip')
  @HttpCode(HttpStatus.CREATED)
  skip(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: SkipOccurrenceDto,
  ) {
    return this.activityOccurrencesService.skipOccurrence(user_uuid, uuid, dto)
  }
}
