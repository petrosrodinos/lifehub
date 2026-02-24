import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HiddenCategoriesService } from './hidden-categories.service';
import { CreateHiddenCategoryDto } from './dto/create-hidden-category.dto';
import { UpdateHiddenCategoryDto } from './dto/update-hidden-category.dto';

@Controller('hidden-categories')
export class HiddenCategoriesController {
  constructor(private readonly hiddenCategoriesService: HiddenCategoriesService) {}

  @Post()
  create(@Body() createHiddenCategoryDto: CreateHiddenCategoryDto) {
    return this.hiddenCategoriesService.create(createHiddenCategoryDto);
  }

  @Get()
  findAll() {
    return this.hiddenCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hiddenCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHiddenCategoryDto: UpdateHiddenCategoryDto) {
    return this.hiddenCategoriesService.update(+id, updateHiddenCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hiddenCategoriesService.remove(+id);
  }
}
