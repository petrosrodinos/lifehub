import { Module } from '@nestjs/common';
import { HiddenCategoriesService } from './hidden-categories.service';
import { HiddenCategoriesController } from './hidden-categories.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HiddenCategoriesController],
  providers: [HiddenCategoriesService],
})
export class HiddenCategoriesModule {}
