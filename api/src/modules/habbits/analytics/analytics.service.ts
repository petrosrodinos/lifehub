import { Injectable } from '@nestjs/common'
import { ActivityTargetType, FrequencyPeriod, OccurrenceStatus } from '@/generated/prisma'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { calculateStreakFromOccurrences } from '../utils/streak.utils'
import { getDateRangeByPreset, toDayKey } from '../utils/habit-date.utils'

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) { }

  async getActivityProgress(user_uuid: string, activity_uuid: string, range: '7d' | '30d' | '90d' | '1y') {
    const { start, end } = getDateRangeByPreset(range)
    const occurrences = await this.prisma.activityOccurrence.findMany({
      where: {
        user_uuid,
        activity_uuid,
        scheduled_for: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        scheduled_for: 'asc',
      },
    })

    const total = occurrences.length
    const completed = occurrences.filter((item) => item.status === OccurrenceStatus.COMPLETED).length
    const skipped = occurrences.filter((item) => item.status === OccurrenceStatus.SKIPPED).length
    const failed = occurrences.filter((item) => item.status === OccurrenceStatus.FAILED).length
    const completionRate = total > 0 ? Number(((completed / total) * 100).toFixed(2)) : 0
    const streak = calculateStreakFromOccurrences(occurrences, { skipBreaksStreak: true })
    const quantity = await this.getQuantityAnalytics(user_uuid, activity_uuid, range)
    const frequency = await this.getFrequencyAnalytics(user_uuid, activity_uuid, start, end)

    return {
      range,
      completion_rate: completionRate,
      total_completed: completed,
      total_skipped: skipped,
      total_failed: failed,
      streak,
      quantity,
      frequency,
    }
  }

  async getOverview(user_uuid: string) {
    const { start, end } = getDateRangeByPreset('7d')
    const activities = await this.prisma.activity.findMany({
      where: { user_uuid, visible: true },
      select: { uuid: true, name: true },
    })

    const activeCount = await this.prisma.activitySchedule.count({
      where: {
        user_uuid,
        is_active: true,
        OR: [{ valid_until: null }, { valid_until: { gt: new Date() } }],
      },
    })

    const sevenDayOccurrences = await this.prisma.activityOccurrence.findMany({
      where: {
        user_uuid,
        scheduled_for: { gte: start, lte: end },
      },
      select: {
        activity_uuid: true,
        status: true,
        scheduled_for: true,
      },
    })

    const completed = sevenDayOccurrences.filter((item) => item.status === OccurrenceStatus.COMPLETED).length
    const completionRateLast7Days =
      sevenDayOccurrences.length > 0 ? Number(((completed / sevenDayOccurrences.length) * 100).toFixed(2)) : 0

    let bestStreakActivity: { activity_uuid: string; name: string; current_streak: number } | null = null
    for (const activity of activities) {
      const streak = calculateStreakFromOccurrences(
        sevenDayOccurrences
          .filter((occurrence) => occurrence.activity_uuid === activity.uuid)
          .map((item) => ({ scheduled_for: item.scheduled_for, status: item.status })),
        { skipBreaksStreak: true },
      )

      if (!bestStreakActivity || streak.currentStreak > bestStreakActivity.current_streak) {
        bestStreakActivity = {
          activity_uuid: activity.uuid,
          name: activity.name,
          current_streak: streak.currentStreak,
        }
      }
    }

    const skippedMap = new Map<string, number>()
    for (const item of sevenDayOccurrences) {
      if (item.status === OccurrenceStatus.SKIPPED) {
        skippedMap.set(item.activity_uuid, (skippedMap.get(item.activity_uuid) ?? 0) + 1)
      }
    }

    const mostSkipped = Array.from(skippedMap.entries())
      .sort((a, b) => b[1] - a[1])
      .at(0)

    const mostSkippedActivity = mostSkipped
      ? {
        activity_uuid: mostSkipped[0],
        name: activities.find((item) => item.uuid === mostSkipped[0])?.name ?? '',
        skipped_count: mostSkipped[1],
      }
      : null

    const heatmapMap = new Map<string, number>()
    for (const item of sevenDayOccurrences) {
      if (item.status === OccurrenceStatus.COMPLETED) {
        const key = toDayKey(item.scheduled_for)
        heatmapMap.set(key, (heatmapMap.get(key) ?? 0) + 1)
      }
    }

    const heatmap = Array.from(heatmapMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }))

    return {
      total_active_activities: activeCount,
      completion_rate_last_7_days: completionRateLast7Days,
      best_streak_activity: bestStreakActivity,
      most_skipped_activity: mostSkippedActivity,
      daily_completion_heatmap: heatmap,
    }
  }

  private async getQuantityAnalytics(user_uuid: string, activity_uuid: string, range: '7d' | '30d' | '90d' | '1y') {
    const { start, end } = getDateRangeByPreset(range)
    const schedule = await this.prisma.activitySchedule.findFirst({
      where: {
        user_uuid,
        activity_uuid,
        target_type: ActivityTargetType.QUANTITY,
        valid_from: { lte: end },
      },
      orderBy: {
        valid_from: 'desc',
      },
    })

    if (!schedule) {
      return null
    }

    const logs = await this.prisma.activityLog.findMany({
      where: {
        user_uuid,
        activity_uuid,
        completed: true,
        created_at: { gte: start, lte: end },
      },
      select: {
        value: true,
      },
    })

    const previousDurationMs = end.getTime() - start.getTime()
    const previousStart = new Date(start.getTime() - previousDurationMs - 24 * 60 * 60 * 1000)
    const previousEnd = new Date(start.getTime() - 1)
    const previousLogs = await this.prisma.activityLog.findMany({
      where: {
        user_uuid,
        activity_uuid,
        completed: true,
        created_at: { gte: previousStart, lte: previousEnd },
      },
      select: {
        value: true,
      },
    })

    const totalQuantity = logs.reduce((sum, item) => sum + (item.value ?? 0), 0)
    const previousTotal = previousLogs.reduce((sum, item) => sum + (item.value ?? 0), 0)
    const daySpan = Math.max(1, Math.round(previousDurationMs / (1000 * 60 * 60 * 24)) + 1)
    const averagePerDay = totalQuantity / daySpan
    const averagePerWeek = averagePerDay * 7
    const trendVsPreviousPeriod = previousTotal === 0 ? 100 : Number((((totalQuantity - previousTotal) / previousTotal) * 100).toFixed(2))
    const target = schedule.target_value ?? 0
    const percentOfTarget = target > 0 ? Number(((totalQuantity / target) * 100).toFixed(2)) : 0

    return {
      total_quantity_completed: Number(totalQuantity.toFixed(2)),
      average_per_day: Number(averagePerDay.toFixed(2)),
      average_per_week: Number(averagePerWeek.toFixed(2)),
      trend_vs_previous_period: trendVsPreviousPeriod,
      percent_of_target_achieved: percentOfTarget,
    }
  }

  private async getFrequencyAnalytics(user_uuid: string, activity_uuid: string, start: Date, end: Date) {
    const schedules = await this.prisma.activitySchedule.findMany({
      where: {
        user_uuid,
        activity_uuid,
        frequency_value: { not: null },
        frequency_period: { not: null },
        valid_from: { lte: end },
        OR: [{ valid_until: null }, { valid_until: { gte: start } }],
      },
      orderBy: {
        valid_from: 'asc',
      },
    })

    if (schedules.length === 0) {
      return []
    }

    const occurrences = await this.prisma.activityOccurrence.findMany({
      where: {
        user_uuid,
        activity_uuid,
        scheduled_for: {
          gte: start,
          lte: end,
        },
      },
      select: {
        schedule_uuid: true,
        scheduled_for: true,
        status: true,
      },
    })

    return schedules.map((schedule) => {
      const periodType = schedule.frequency_period as FrequencyPeriod
      const periodGroups = new Map<string, { required: number; completed: number }>()

      for (const occurrence of occurrences.filter((item) => item.schedule_uuid === schedule.uuid)) {
        const key =
          periodType === FrequencyPeriod.MONTH
            ? `${occurrence.scheduled_for.getUTCFullYear()}-${occurrence.scheduled_for.getUTCMonth() + 1}`
            : `${occurrence.scheduled_for.getUTCFullYear()}-${Math.ceil(occurrence.scheduled_for.getUTCDate() / 7)}-${occurrence.scheduled_for.getUTCMonth() + 1}`

        const current = periodGroups.get(key) ?? { required: schedule.frequency_value ?? 0, completed: 0 }
        if (occurrence.status === OccurrenceStatus.COMPLETED) {
          current.completed += 1
        }
        periodGroups.set(key, current)
      }

      const periods = Array.from(periodGroups.entries()).map(([period_key, values]) => ({
        period_key,
        required_count: values.required,
        completed_count: values.completed,
        success_rate: values.required > 0 ? Number(((values.completed / values.required) * 100).toFixed(2)) : 0,
      }))

      return {
        schedule_uuid: schedule.uuid,
        frequency_period: periodType,
        periods,
      }
    })
  }
}
