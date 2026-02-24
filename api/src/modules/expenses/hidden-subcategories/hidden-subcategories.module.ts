import { Module } from '@nestjs/common';
import { HiddenSubcategoriesService } from './hidden-subcategories.service';
import { HiddenSubcategoriesController } from './hidden-subcategories.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HiddenSubcategoriesController],
  providers: [HiddenSubcategoriesService],
})
export class HiddenSubcategoriesModule {}
