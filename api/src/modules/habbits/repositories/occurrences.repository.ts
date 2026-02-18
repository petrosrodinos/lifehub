import { Injectable } from '@nestjs/common'
import { OccurrenceStatus, Prisma } from '@/generated/prisma'
import { PrismaService } from '@/core/databases/prisma/prisma.service'

@Injectable()
export class OccurrencesRepository {
  constructor(private readonly prisma: PrismaService) { }

  createMany(
    tx: Prisma.TransactionClient,
    entries: Array<{ user_uuid: string; activity_uuid: string; schedule_uuid: string; scheduled_for: Date }>,
  ) {
    return tx.activityOccurrence.createMany({
      data: entries,
      skipDuplicates: true,
    })
  }

  markMissedAsFailed(before: Date) {
    return this.prisma.activityOccurrence.updateMany({
      where: {
        status: OccurrenceStatus.PENDING,
        scheduled_for: {
          lt: before,
        },
      },
      data: {
        status: OccurrenceStatus.FAILED,
      },
    })
  }
}
