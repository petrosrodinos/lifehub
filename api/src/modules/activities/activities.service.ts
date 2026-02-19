import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { AnalyticsService } from '@/modules/habbits/analytics/analytics.service'
import { DateTime } from 'luxon'
import { ActivityHabbitsQueryType } from './schemas/activity-habbits-query.schema'

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analyticsService: AnalyticsService,
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
    const [progress_7d, progress_30d, most_skipped_activity, daily_completion_heatmap] = await Promise.all([
      this.analyticsService.getActivityProgress(user_uuid, query.activity_uuid, '7d'),
      this.analyticsService.getActivityProgress(user_uuid, query.activity_uuid, '30d'),
      this.analyticsService.getMostSkippedActivity(user_uuid, query.activity_uuid),
      this.analyticsService.getDailyCompletionHeatmap(user_uuid, query.activity_uuid),
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
      daily_completion_heatmap,
    }
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
