import { Module } from '@nestjs/common';
import { HiddenSubcategoriesService } from './hidden-subcategories.service';
import { HiddenSubcategoriesController } from './hidden-subcategories.controller';

@Module({
  controllers: [HiddenSubcategoriesController],
  providers: [HiddenSubcategoriesService],
})
export class HiddenSubcategoriesModule {}
