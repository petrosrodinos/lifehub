import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { HiddenSubcategoriesService } from './hidden-subcategories.service';
import { CreateHiddenSubcategoryDto } from './dto/create-hidden-subcategory.dto';
import { UpdateHiddenSubcategoryDto } from './dto/update-hidden-subcategory.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('hidden-subcategories')
@UseGuards(JwtGuard)
export class HiddenSubcategoriesController {
  constructor(private readonly hiddenSubcategoriesService: HiddenSubcategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createHiddenSubcategoryDto: CreateHiddenSubcategoryDto
  ) {
    return this.hiddenSubcategoriesService.create(user_uuid, createHiddenSubcategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.hiddenSubcategoriesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.hiddenSubcategoriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateHiddenSubcategoryDto: UpdateHiddenSubcategoryDto
  ) {
    return this.hiddenSubcategoriesService.update(user_uuid, uuid, updateHiddenSubcategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.hiddenSubcategoriesService.remove(user_uuid, uuid);
  }
}
