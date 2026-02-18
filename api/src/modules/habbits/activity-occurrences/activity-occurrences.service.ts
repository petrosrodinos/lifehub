import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ActivityTargetType, OccurrenceStatus } from '@/generated/prisma'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CompleteOccurrenceDto } from './dto/complete-occurrence.dto'
import { SkipOccurrenceDto } from './dto/skip-occurrence.dto'
import { Cron, CronExpression } from '@nestjs/schedule'
import { DateTime } from 'luxon'
import { generateOccurrencesForSchedule } from '../utils/occurrence-generation.utils'
import { OccurrencesRepository } from '../repositories/occurrences.repository'

@Injectable()
export class ActivityOccurrencesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly occurrencesRepository: OccurrencesRepository,
  ) { }

  async generateOccurrencesForUser(user_uuid: string, horizonDays = 30) {
    const now = new Date()
    const end = DateTime.fromJSDate(now).plus({ days: horizonDays }).endOf('day').toJSDate()
    const schedules = await this.prisma.activitySchedule.findMany({
      where: {
        user_uuid,
        is_active: true,
        valid_from: { lte: end },
        OR: [{ valid_until: null }, { valid_until: { gt: now } }],
      },
      include: {
        weekdays: true,
        specific_dates: true,
      },
    })

    return this.prisma.$transaction(async (tx) => {
      let totalCreated = 0
      for (const schedule of schedules) {
        const dates = generateOccurrencesForSchedule(schedule, now, end)
        if (dates.length === 0) {
          continue
        }

        const result = await this.occurrencesRepository.createMany(
          tx,
          dates.map((scheduled_for) => ({
            user_uuid,
            activity_uuid: schedule.activity_uuid,
            schedule_uuid: schedule.uuid,
            scheduled_for,
          })),
        )
        totalCreated += result.count
      }
      return { created: totalCreated }
    })
  }

  async completeOccurrence(user_uuid: string, occurrence_uuid: string, dto: CompleteOccurrenceDto) {
    return this.prisma.$transaction(async (tx) => {
      const occurrence = await tx.activityOccurrence.findFirst({
        where: {
          uuid: occurrence_uuid,
          user_uuid,
        },
        include: {
          schedule: true,
        },
      })

      if (!occurrence) {
        throw new NotFoundException('Occurrence not found')
      }
      if (occurrence.status === OccurrenceStatus.COMPLETED) {
        throw new ConflictException('Occurrence already completed')
      }
      if (occurrence.status === OccurrenceStatus.SKIPPED) {
        throw new ConflictException('Skipped occurrence cannot be completed')
      }

      if (
        occurrence.schedule.target_type === ActivityTargetType.BOOLEAN &&
        dto.value !== undefined &&
        dto.value !== null
      ) {
        throw new BadRequestException('value is not allowed for BOOLEAN target_type')
      }

      await tx.activityLog.create({
        data: {
          user_uuid,
          activity_uuid: occurrence.activity_uuid,
          schedule_uuid: occurrence.schedule_uuid,
          occurrence_uuid: occurrence.uuid,
          snapshot_target_type: occurrence.schedule.target_type,
          snapshot_target_value: occurrence.schedule.target_value,
          snapshot_target_unit: occurrence.schedule.target_unit,
          snapshot_target_unit_label: occurrence.schedule.target_unit_label,
          value: dto.value ?? null,
          completed: true,
          completed_at: new Date(),
          skipped: false,
          notes: dto.notes,
        },
      })

      return tx.activityOccurrence.update({
        where: { uuid: occurrence.uuid },
        data: {
          status: OccurrenceStatus.COMPLETED,
        },
      })
    })
  }

  async skipOccurrence(user_uuid: string, occurrence_uuid: string, dto: SkipOccurrenceDto) {
    return this.prisma.$transaction(async (tx) => {
      const occurrence = await tx.activityOccurrence.findFirst({
        where: {
          uuid: occurrence_uuid,
          user_uuid,
        },
        include: {
          schedule: true,
        },
      })

      if (!occurrence) {
        throw new NotFoundException('Occurrence not found')
      }
      if (occurrence.status === OccurrenceStatus.COMPLETED) {
        throw new ConflictException('Completed occurrence cannot be skipped')
      }
      if (occurrence.status === OccurrenceStatus.SKIPPED) {
        throw new ConflictException('Occurrence already skipped')
      }

      await tx.activityLog.create({
        data: {
          user_uuid,
          activity_uuid: occurrence.activity_uuid,
          schedule_uuid: occurrence.schedule_uuid,
          occurrence_uuid: occurrence.uuid,
          snapshot_target_type: occurrence.schedule.target_type,
          snapshot_target_value: occurrence.schedule.target_value,
          snapshot_target_unit: occurrence.schedule.target_unit,
          snapshot_target_unit_label: occurrence.schedule.target_unit_label,
          value: null,
          completed: false,
          completed_at: null,
          skipped: true,
          skip_reason: dto.skip_reason,
          notes: dto.notes,
        },
      })

      return tx.activityOccurrence.update({
        where: { uuid: occurrence.uuid },
        data: {
          status: OccurrenceStatus.SKIPPED,
        },
      })
    })
  }

  async markMissedOccurrencesAsFailed() {
    return this.occurrencesRepository.markMissedAsFailed(new Date())
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async runDailyMaintenance() {
    const users = await this.prisma.user.findMany({
      select: { uuid: true },
    })

    for (const user of users) {
      await this.generateOccurrencesForUser(user.uuid, 30)
    }

    await this.markMissedOccurrencesAsFailed()
  }
}
