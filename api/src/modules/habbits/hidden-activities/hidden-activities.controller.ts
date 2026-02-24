import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { HiddenActivitiesService } from './hidden-activities.service';
import { CreateHiddenActivityDto } from './dto/create-hidden-activity.dto';
import { UpdateHiddenActivityDto } from './dto/update-hidden-activity.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('hidden-activities')
@UseGuards(JwtGuard)
export class HiddenActivitiesController {
  constructor(private readonly hiddenActivitiesService: HiddenActivitiesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createHiddenActivityDto: CreateHiddenActivityDto
  ) {
    return this.hiddenActivitiesService.create(user_uuid, createHiddenActivityDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.hiddenActivitiesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.hiddenActivitiesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateHiddenActivityDto: UpdateHiddenActivityDto
  ) {
    return this.hiddenActivitiesService.update(user_uuid, uuid, updateHiddenActivityDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.hiddenActivitiesService.remove(user_uuid, uuid);
  }
}
