import { Module } from '@nestjs/common';
import { HiddenActivitiesService } from './hidden-activities.service';
import { HiddenActivitiesController } from './hidden-activities.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HiddenActivitiesController],
  providers: [HiddenActivitiesService],
})
export class HiddenActivitiesModule {}
