import { Module } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { WorkoutsController } from './workouts.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
