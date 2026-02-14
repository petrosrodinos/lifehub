import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateActivityDto } from '../dto/create-activity.dto'
import { UpdateActivityDto } from '../dto/update-activity.dto'

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateActivityDto, userUuid: string) {
    const existingActivity = await this.prisma.activity.findFirst({
      where: {
        name: dto.name,
        user_uuid: userUuid || null,
      },
    })

    if (existingActivity) {
      throw new ConflictException('Activity with this name already exists')
    }

    return this.prisma.activity.create({
      data: {
        name: dto.name,
        color: dto.color,
        is_default: dto.is_default || false,
        user_uuid: userUuid,
      },
    })
  }

  async findAll(userUuid: string) {
    return this.prisma.activity.findMany({
      where: {
        OR: [
          { user_uuid: userUuid },
          { is_default: true },
        ],
      },
      orderBy: {
        created_at: 'asc',
      },
    })
  }

  async findOne(uuid: string, userUuid: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        uuid,
        OR: [
          { user_uuid: userUuid },
          { is_default: true },
        ],
      },
    })

    if (!activity) {
      throw new NotFoundException('Activity not found')
    }

    return activity
  }

  async update(uuid: string, dto: UpdateActivityDto, userUuid: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        uuid,
        user_uuid: userUuid,
      },
    })

    if (!activity) {
      throw new NotFoundException('Activity not found or you do not have permission to update it')
    }

    if (dto.name) {
      const existingActivity = await this.prisma.activity.findFirst({
        where: {
          name: dto.name,
          user_uuid: userUuid || null,
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

  async remove(uuid: string, userUuid: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        uuid,
        user_uuid: userUuid,
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
