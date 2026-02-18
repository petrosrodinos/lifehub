import { Injectable } from '@nestjs/common'
import { Prisma } from '@/generated/prisma'
import { PrismaService } from '@/core/databases/prisma/prisma.service'

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prisma: PrismaService) { }

  findActiveSchedule(user_uuid: string, activity_uuid: string, at: Date) {
    return this.prisma.activitySchedule.findFirst({
      where: {
        user_uuid,
        activity_uuid,
        valid_from: { lte: at },
        OR: [{ valid_until: null }, { valid_until: { gt: at } }],
      },
      include: {
        weekdays: true,
        specific_dates: true,
      },
      orderBy: { valid_from: 'desc' },
    })
  }

  createSchedule(
    tx: Prisma.TransactionClient,
    data: Prisma.ActivityScheduleUncheckedCreateInput,
    weekdays: number[],
    specificDates: Date[],
  ) {
    return tx.activitySchedule.create({
      data: {
        ...data,
        weekdays: {
          createMany: {
            data: weekdays.map((weekday) => ({ weekday })),
            skipDuplicates: true,
          },
        },
        specific_dates: {
          createMany: {
            data: specificDates.map((date) => ({ date })),
            skipDuplicates: true,
          },
        },
      },
      include: {
        weekdays: true,
        specific_dates: true,
      },
    })
  }
}
