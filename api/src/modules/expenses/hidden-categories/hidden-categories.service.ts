import { Injectable } from '@nestjs/common';
import { CreateHiddenCategoryDto } from './dto/create-hidden-category.dto';
import { UpdateHiddenCategoryDto } from './dto/update-hidden-category.dto';

@Injectable()
export class HiddenCategoriesService {
  create(createHiddenCategoryDto: CreateHiddenCategoryDto) {
    return 'This action adds a new hiddenCategory';
  }

  findAll() {
    return `This action returns all hiddenCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hiddenCategory`;
  }

  update(id: number, updateHiddenCategoryDto: UpdateHiddenCategoryDto) {
    return `This action updates a #${id} hiddenCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} hiddenCategory`;
  }
}
