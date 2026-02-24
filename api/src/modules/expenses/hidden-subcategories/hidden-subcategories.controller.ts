import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HiddenSubcategoriesService } from './hidden-subcategories.service';
import { CreateHiddenSubcategoryDto } from './dto/create-hidden-subcategory.dto';
import { UpdateHiddenSubcategoryDto } from './dto/update-hidden-subcategory.dto';

@Controller('hidden-subcategories')
export class HiddenSubcategoriesController {
  constructor(private readonly hiddenSubcategoriesService: HiddenSubcategoriesService) {}

  @Post()
  create(@Body() createHiddenSubcategoryDto: CreateHiddenSubcategoryDto) {
    return this.hiddenSubcategoriesService.create(createHiddenSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.hiddenSubcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hiddenSubcategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHiddenSubcategoryDto: UpdateHiddenSubcategoryDto) {
    return this.hiddenSubcategoriesService.update(+id, updateHiddenSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hiddenSubcategoriesService.remove(+id);
  }
}
