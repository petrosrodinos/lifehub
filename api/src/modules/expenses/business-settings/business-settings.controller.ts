import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { BusinessSettingsService } from './business-settings.service';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('business-settings')
@UseGuards(JwtGuard)
export class BusinessSettingsController {
  constructor(private readonly businessSettingsService: BusinessSettingsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  get(@CurrentUser('user_uuid') user_uuid: string) {
    return this.businessSettingsService.get(user_uuid);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() updateBusinessSettingsDto: UpdateBusinessSettingsDto,
  ) {
    return this.businessSettingsService.update(user_uuid, updateBusinessSettingsDto);
  }
}
