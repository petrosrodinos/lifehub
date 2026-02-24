import { Module } from '@nestjs/common';
import { HiddenCategoriesService } from './hidden-categories.service';
import { HiddenCategoriesController } from './hidden-categories.controller';

@Module({
  controllers: [HiddenCategoriesController],
  providers: [HiddenCategoriesService],
})
export class HiddenCategoriesModule {}
