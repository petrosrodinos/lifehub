import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateActivityDto } from '../dto/create-activity.dto'
import { UpdateActivityDto } from '../dto/update-activity.dto'
import { AnalyticsService } from '@/modules/habbits/analytics/analytics.service'
import { DateTime } from 'luxon'

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
    const now = new Date()
    const dayStart = DateTime.now().startOf('day').toJSDate()
    const dayEnd = DateTime.now().endOf('day').toJSDate()

    const activities = await this.prisma.activity.findMany({
      where: {
        user_uuid: user_uuid,
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
          orderBy: {
            valid_from: 'desc',
          },
          take: 1,
        },
        activity_occurrences: {
          where: {
            scheduled_for: {
              gte: dayStart,
              lte: dayEnd,
            },
          },
          orderBy: {
            scheduled_for: 'asc',
          },
          take: 1,
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    })

    return activities.map((activity) => ({
      ...activity,
      current_schedule: activity.activity_schedules[0] ?? null,
      today_occurrence: activity.activity_occurrences[0] ?? null,
      activity_schedules: undefined,
      activity_occurrences: undefined,
    }))
  }

  async findOne(uuid: string, user_uuid: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        uuid,
        user_uuid: user_uuid,
      },
      include: {
        activity_schedules: {
          include: {
            weekdays: true,
            specific_dates: true,
          },
          orderBy: {
            valid_from: 'desc',
          },
        },
        activity_occurrences: {
          where: {
            scheduled_for: {
              gte: new Date(),
            },
          },
          orderBy: {
            scheduled_for: 'asc',
          },
          take: 30,
        },
        activity_logs: {
          orderBy: {
            created_at: 'desc',
          },
          take: 30,
        },
      },
    })

    if (!activity) {
      throw new NotFoundException('Activity not found')
    }

    const analytics = await this.analyticsService.getActivityProgress(user_uuid, uuid, '30d')

    return {
      ...activity,
      analytics,
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
