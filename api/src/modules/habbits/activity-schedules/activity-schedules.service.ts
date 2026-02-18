import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ActivityRepeatType } from '@/generated/prisma'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto'
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto'
import { SchedulesRepository } from '../repositories/schedules.repository'
import { generateOccurrencesForSchedule } from '../utils/occurrence-generation.utils'
import { DateTime } from 'luxon'

@Injectable()
export class ActivitySchedulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulesRepository: SchedulesRepository,
  ) { }

  async createForActivity(user_uuid: string, activity_uuid: string, dto: CreateActivityScheduleDto) {
    this.validateScheduleDto(dto)

    const activity = await this.prisma.activity.findFirst({
      where: { uuid: activity_uuid, user_uuid },
    })

    if (!activity) {
      throw new NotFoundException('Activity not found')
    }

    const now = new Date()
    const rangeEnd = DateTime.fromJSDate(now).plus({ days: 30 }).endOf('day').toJSDate()

    return this.prisma.$transaction(async (tx) => {
      await tx.activitySchedule.updateMany({
        where: {
          activity_uuid,
          user_uuid,
          valid_until: null,
          is_active: true,
        },
        data: {
          valid_until: now,
          is_active: false,
        },
      })

      const schedule = await this.schedulesRepository.createSchedule(
        tx,
        {
          user_uuid,
          activity_uuid,
          valid_from: now,
          valid_until: null,
          repeat_type: dto.repeat_type,
          interval_days: dto.interval_days,
          time_of_day: dto.time_of_day,
          frequency_value: dto.frequency_value,
          frequency_period: dto.frequency_period,
          target_type: dto.target_type,
          target_value: dto.target_value,
          target_unit: dto.target_unit,
          target_unit_label: dto.target_unit_label,
          is_active: true,
        },
        dto.weekdays ?? [],
        (dto.specific_dates ?? []).map((entry) => new Date(entry)),
      )

      const scheduledDates = generateOccurrencesForSchedule(schedule, now, rangeEnd)
      if (scheduledDates.length > 0) {
        await tx.activityOccurrence.createMany({
          data: scheduledDates.map((scheduled_for) => ({
            user_uuid,
            activity_uuid,
            schedule_uuid: schedule.uuid,
            scheduled_for,
          })),
          skipDuplicates: true,
        })
      }

      return schedule
    })
  }

  async updateWithVersioning(user_uuid: string, schedule_uuid: string, dto: UpdateActivityScheduleDto) {
    const existing = await this.prisma.activitySchedule.findFirst({
      where: { uuid: schedule_uuid, user_uuid },
      include: {
        weekdays: true,
        specific_dates: true,
      },
    })

    if (!existing) {
      throw new NotFoundException('Schedule not found')
    }

    const mergedDto: CreateActivityScheduleDto = {
      repeat_type: dto.repeat_type ?? existing.repeat_type,
      interval_days: dto.interval_days ?? existing.interval_days ?? undefined,
      time_of_day: dto.time_of_day ?? existing.time_of_day ?? undefined,
      frequency_value: dto.frequency_value ?? existing.frequency_value ?? undefined,
      frequency_period: dto.frequency_period ?? existing.frequency_period ?? undefined,
      target_type: dto.target_type ?? existing.target_type,
      target_value: dto.target_value ?? existing.target_value ?? undefined,
      target_unit: dto.target_unit ?? existing.target_unit ?? undefined,
      target_unit_label: dto.target_unit_label ?? existing.target_unit_label ?? undefined,
      weekdays: dto.weekdays ?? existing.weekdays.map((item) => item.weekday),
      specific_dates: dto.specific_dates ?? existing.specific_dates.map((item) => item.date.toISOString()),
    }
    this.validateScheduleDto(mergedDto)

    const now = new Date()
    const rangeEnd = DateTime.fromJSDate(now).plus({ days: 30 }).endOf('day').toJSDate()

    return this.prisma.$transaction(async (tx) => {
      await tx.activitySchedule.update({
        where: { uuid: existing.uuid },
        data: {
          valid_until: now,
          is_active: false,
        },
      })

      await tx.activityOccurrence.deleteMany({
        where: {
          user_uuid,
          schedule_uuid: existing.uuid,
          status: 'PENDING',
          scheduled_for: {
            gte: now,
          },
        },
      })

      const newSchedule = await this.schedulesRepository.createSchedule(
        tx,
        {
          user_uuid,
          activity_uuid: existing.activity_uuid,
          valid_from: now,
          valid_until: null,
          repeat_type: mergedDto.repeat_type,
          interval_days: mergedDto.interval_days,
          time_of_day: mergedDto.time_of_day,
          frequency_value: mergedDto.frequency_value,
          frequency_period: mergedDto.frequency_period,
          target_type: mergedDto.target_type,
          target_value: mergedDto.target_value,
          target_unit: mergedDto.target_unit,
          target_unit_label: mergedDto.target_unit_label,
          is_active: true,
        },
        mergedDto.weekdays ?? [],
        (mergedDto.specific_dates ?? []).map((date) => new Date(date)),
      )

      const scheduledDates = generateOccurrencesForSchedule(newSchedule, now, rangeEnd)
      if (scheduledDates.length > 0) {
        await tx.activityOccurrence.createMany({
          data: scheduledDates.map((scheduled_for) => ({
            user_uuid,
            activity_uuid: existing.activity_uuid,
            schedule_uuid: newSchedule.uuid,
            scheduled_for,
          })),
          skipDuplicates: true,
        })
      }

      return newSchedule
    })
  }

  private validateScheduleDto(dto: CreateActivityScheduleDto) {
    if (dto.repeat_type === ActivityRepeatType.WEEKDAYS && (!dto.weekdays || dto.weekdays.length === 0)) {
      throw new BadRequestException('weekdays are required for WEEKDAYS repeat_type')
    }

    if (dto.repeat_type === ActivityRepeatType.INTERVAL && !dto.interval_days) {
      throw new BadRequestException('interval_days is required for INTERVAL repeat_type')
    }

    if (dto.repeat_type === ActivityRepeatType.DATES && (!dto.specific_dates || dto.specific_dates.length === 0)) {
      throw new BadRequestException('specific_dates are required for DATES repeat_type')
    }

    if (
      dto.repeat_type === ActivityRepeatType.FREQUENCY &&
      (!dto.frequency_value || !dto.frequency_period)
    ) {
      throw new BadRequestException('frequency_value and frequency_period are required for FREQUENCY repeat_type')
    }
  }
}
