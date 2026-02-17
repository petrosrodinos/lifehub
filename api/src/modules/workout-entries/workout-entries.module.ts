import { Module } from '@nestjs/common'
import { WorkoutEntriesService } from './workout-entries.service'
import { WorkoutEntriesController } from './workout-entries.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutEntriesController],
  providers: [WorkoutEntriesService],
})
export class WorkoutEntriesModule { }
