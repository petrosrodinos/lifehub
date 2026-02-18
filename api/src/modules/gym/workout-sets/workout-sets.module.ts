import { Module } from '@nestjs/common'
import { WorkoutSetsService } from './workout-sets.service'
import { WorkoutSetsController } from './workout-sets.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutSetsController],
  providers: [WorkoutSetsService],
})
export class WorkoutSetsModule {}
