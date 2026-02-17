import { Module } from '@nestjs/common';
import { MuscleGroupsService } from './muscle-groups.service';
import { MuscleGroupsController } from './muscle-groups.controller';

@Module({
  controllers: [MuscleGroupsController],
  providers: [MuscleGroupsService],
})
export class MuscleGroupsModule {}
