import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { AnalyticsService } from '@/modules/habbits/analytics/analytics.service'
import { DateTime } from 'luxon'
import { ActivityHabbitsQueryType } from './schemas/activity-habbits-query.schema'
import { generateOccurrencesForSchedule } from '@/modules/habbits/utils/occurrence-generation.utils'
import { OccurrencesRepository } from '@/modules/habbits/repositories/occurrences.repository'

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analyticsService: AnalyticsService,
    private readonly occurrencesRepository: OccurrencesRepository,
  ) { }

  async create(dto: CreateActivityDto, user_uuid: string) {
    const existingActivity = await this.prisma.activity.findFirst({
      where: {
        name: dto.name,
        user_uuid: user_uuid,
      },
    })

    if (existingActivity) {
      throw new ConflictException('Activity with this name already exists')
    }

    return this.prisma.activity.create({
      data: {
        name: dto.name,
        description: dto.description,
        icon: dto.icon,
        color: dto.color,
        visible: dto.visible ?? true,
        user_uuid: user_uuid,
      },
    })
  }

  async findAll(user_uuid: string) {
    const activities = await this.prisma.activity.findMany({
      where: {
        user_uuid: user_uuid,
      }
    })

    return activities
  }

  async getActivityHabbits(user_uuid: string, query: ActivityHabbitsQueryType) {
    const now = new Date()
    const rangeStart = query.date_from ? DateTime.fromISO(query.date_from).startOf('day') : DateTime.now().startOf('day')
    const rangeEnd = query.date_to ? DateTime.fromISO(query.date_to).endOf('day') : rangeStart.endOf('day')
    const dayStart = rangeStart.toJSDate()
    const dayEnd = rangeEnd.toJSDate()

    await this.ensureOccurrencesExist(user_uuid, query.activity_uuid, dayStart, dayEnd)

    const activities = await this.prisma.activity.findMany({
      where: {
        user_uuid,
        visible: true,
        ...(query.activity_uuid ? { uuid: query.activity_uuid } : {}),
      },
      include: {
        activity_schedules: {
          where: {
            valid_from: { lte: now },
            OR: [{ valid_until: null }, { valid_until: { gt: now } }],
          },
          include: {
            weekdays: true,
            specific_dates: true,
          },
          orderBy: { valid_from: 'desc' },
          take: 1,
        },
        activity_occurrences: {
          where: {
            scheduled_for: { gte: dayStart, lte: dayEnd },
          },
          include: { log: true },
          orderBy: { scheduled_for: 'asc' },
          take: 1,
        },
      },
    })

    const parseTimeOfDay = (timeOfDay?: string | null): number => {
      if (!timeOfDay) return Number.MAX_SAFE_INTEGER
      const [hours, minutes] = timeOfDay.split(':').map(Number)
      return hours * 60 + (minutes ?? 0)
    }

    return activities
      .filter((activity) => activity.activity_occurrences.length > 0)
      .map((activity) => {
        const { activity_schedules, activity_occurrences, ...activityData } = activity
        const schedule = activity_schedules[0] ?? null
        const occurrence = activity_occurrences[0]
        return {
          activity: activityData,
          schedule,
          status: occurrence.status,
          occurrence_uuid: occurrence.uuid,
          quantity_value: (occurrence.log?.value as number | null | undefined) ?? null,
        }
      })
      .sort((a, b) => parseTimeOfDay(a.schedule?.time_of_day) - parseTimeOfDay(b.schedule?.time_of_day))
  }

  private async ensureOccurrencesExist(
    user_uuid: string,
    activity_uuid: string | undefined,
    rangeStart: Date,
    rangeEnd: Date,
  ): Promise<void> {
    const schedules = await this.prisma.activitySchedule.findMany({
      where: {
        user_uuid,
        is_active: true,
        valid_from: { lte: rangeEnd },
        OR: [{ valid_until: null }, { valid_until: { gt: rangeStart } }],
        ...(activity_uuid ? { activity_uuid } : {}),
      },
      include: {
        weekdays: true,
        specific_dates: true,
      },
    })

    const entries = schedules.flatMap((schedule) => {
      const dates = generateOccurrencesForSchedule(schedule, rangeStart, rangeEnd)

      return dates.map((scheduled_for) => ({
        user_uuid,
        activity_uuid: schedule.activity_uuid,
        schedule_uuid: schedule.uuid,
        scheduled_for,
      }))
    })

    if (entries.length === 0) {
      return
    }

    await this.prisma.$transaction(async (tx) => {
      await this.occurrencesRepository.createMany(tx, entries)
    })
  }

  async findOne(uuid: string, user_uuid: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        uuid,
        user_uuid: user_uuid,
      }
    })

    return activity
  }

  async getProgressSummary(user_uuid: string, query: ActivityHabbitsQueryType) {
    const [progress_7d, progress_30d, most_skipped_activity] = await Promise.all([
      this.analyticsService.getActivityProgress(user_uuid, query.activity_uuid, '7d'),
      this.analyticsService.getActivityProgress(user_uuid, query.activity_uuid, '30d'),
      this.analyticsService.getMostSkippedActivity(user_uuid, query.activity_uuid),
    ])

    const frequencyPeriods = progress_30d.frequency?.flatMap((entry) => entry.periods) ?? []
    const frequency_success_rate =
      frequencyPeriods.length > 0
        ? Number(
          (
            frequencyPeriods.reduce((sum, period) => sum + period.success_rate, 0) /
            frequencyPeriods.length
          ).toFixed(2),
        )
        : null

    return {
      completion_rate_7d: progress_7d.completion_rate,
      completion_rate_30d: progress_30d.completion_rate,
      quantity_total_30d: progress_30d.quantity?.total_quantity_completed ?? 0,
      frequency_success_rate,
      progress_7d,
      progress_30d,
      most_skipped_activity,
    }
  }

  async getCompletionHeatmaps(user_uuid: string) {
    return this.analyticsService.getCompletionHeatmaps(user_uuid)
  }

  async update(uuid: string, dto: UpdateActivityDto, user_uuid: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        uuid,
        user_uuid: user_uuid,
      },
    })

    if (!activity) {
      throw new NotFoundException('Activity not found or you do not have permission to update it')
    }

    if (dto.name) {
      const existingActivity = await this.prisma.activity.findFirst({
        where: {
          name: dto.name,
          user_uuid: user_uuid,
          uuid: { not: uuid },
        },
      })

      if (existingActivity) {
        throw new ConflictException('Activity with this name already exists')
      }
    }

    return this.prisma.activity.update({
      where: { uuid },
      data: dto,
    })
  }

  async remove(uuid: string, user_uuid: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        uuid,
        user_uuid: user_uuid,
      },
    })

    if (!activity) {
      throw new NotFoundException('Activity not found or you do not have permission to delete it')
    }

    return this.prisma.activity.delete({
      where: { uuid },
    })
  }
}
