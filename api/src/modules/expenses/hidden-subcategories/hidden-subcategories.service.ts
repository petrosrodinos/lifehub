import { Injectable } from '@nestjs/common';
import { CreateHiddenSubcategoryDto } from './dto/create-hidden-subcategory.dto';
import { UpdateHiddenSubcategoryDto } from './dto/update-hidden-subcategory.dto';

@Injectable()
export class HiddenSubcategoriesService {
  create(createHiddenSubcategoryDto: CreateHiddenSubcategoryDto) {
    return 'This action adds a new hiddenSubcategory';
  }

  findAll() {
    return `This action returns all hiddenSubcategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hiddenSubcategory`;
  }

  update(id: number, updateHiddenSubcategoryDto: UpdateHiddenSubcategoryDto) {
    return `This action updates a #${id} hiddenSubcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} hiddenSubcategory`;
  }
}
