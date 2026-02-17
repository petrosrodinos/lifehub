import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'

@Injectable()
export class MuscleGroupsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createMuscleGroupDto: CreateMuscleGroupDto) {
    const existing = await this.prisma.muscleGroup.findFirst({
      where: {
        user_uuid,
        name: createMuscleGroupDto.name,
      },
    })

    if (existing) {
      throw new ConflictException('Muscle group with this name already exists')
    }

    return this.prisma.muscleGroup.create({
      data: {
        ...createMuscleGroupDto,
        user_uuid,
      },
    })
  }

  async findAll(user_uuid: string) {
    return this.prisma.muscleGroup.findMany({
      where: {
        OR: [{ user_uuid }, { user_uuid: null }],
      },
      orderBy: {
        created_at: 'asc',
      },
    })
  }

  async findOne(uuid: string, user_uuid: string) {
    const muscleGroup = await this.prisma.muscleGroup.findFirst({
      where: {
        uuid,
        OR: [{ user_uuid }, { user_uuid: null }],
      },
      include: {
        exercises: true,
      },
    })

    if (!muscleGroup) {
      throw new NotFoundException('Muscle group not found')
    }

    return muscleGroup
  }

  async update(uuid: string, user_uuid: string, updateMuscleGroupDto: UpdateMuscleGroupDto) {
    const muscleGroup = await this.prisma.muscleGroup.findFirst({
      where: {
        uuid,
        user_uuid,
      },
    })

    if (!muscleGroup) {
      throw new NotFoundException('Muscle group not found or you do not have permission to update it')
    }

    if (updateMuscleGroupDto.name) {
      const existing = await this.prisma.muscleGroup.findFirst({
        where: {
          user_uuid,
          name: updateMuscleGroupDto.name,
          uuid: { not: uuid },
        },
      })

      if (existing) {
        throw new ConflictException('Muscle group with this name already exists')
      }
    }

    return this.prisma.muscleGroup.update({
      where: { uuid },
      data: updateMuscleGroupDto,
    })
  }

  async remove(uuid: string, user_uuid: string) {
    const muscleGroup = await this.prisma.muscleGroup.findFirst({
      where: {
        uuid,
        user_uuid,
      },
    })

    if (!muscleGroup) {
      throw new NotFoundException('Muscle group not found or you do not have permission to delete it')
    }

    return this.prisma.muscleGroup.delete({
      where: { uuid },
    })
  }
}
