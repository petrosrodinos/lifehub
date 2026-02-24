import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { HiddenCategoriesService } from './hidden-categories.service';
import { CreateHiddenCategoryDto } from './dto/create-hidden-category.dto';
import { UpdateHiddenCategoryDto } from './dto/update-hidden-category.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('hidden-categories')
@UseGuards(JwtGuard)
export class HiddenCategoriesController {
  constructor(private readonly hiddenCategoriesService: HiddenCategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createHiddenCategoryDto: CreateHiddenCategoryDto
  ) {
    return this.hiddenCategoriesService.create(user_uuid, createHiddenCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.hiddenCategoriesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.hiddenCategoriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateHiddenCategoryDto: UpdateHiddenCategoryDto
  ) {
    return this.hiddenCategoriesService.update(user_uuid, uuid, updateHiddenCategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.hiddenCategoriesService.remove(user_uuid, uuid);
  }
}
