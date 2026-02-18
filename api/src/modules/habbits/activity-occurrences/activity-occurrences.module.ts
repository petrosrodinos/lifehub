import { Module } from '@nestjs/common'
import { ActivityOccurrencesService } from './activity-occurrences.service'
import { ActivityOccurrencesController } from './activity-occurrences.controller'
import { PrismaModule } from '@/core/databases/prisma/prisma.module'
import { OccurrencesRepository } from '../repositories/occurrences.repository'

@Module({
  imports: [PrismaModule],
  controllers: [ActivityOccurrencesController],
  providers: [ActivityOccurrencesService, OccurrencesRepository],
  exports: [ActivityOccurrencesService],
})
export class ActivityOccurrencesModule { }
