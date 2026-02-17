import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { WorkoutsQueryType } from './schemas/workouts-query.schema'

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createWorkoutDto: CreateWorkoutDto) {
    return this.prisma.workout.create({
      data: {
        user_uuid,
        name: createWorkoutDto.name,
        notes: createWorkoutDto.notes,
        started_at: createWorkoutDto.started_at ? new Date(createWorkoutDto.started_at) : undefined,
        finished_at: createWorkoutDto.finished_at ? new Date(createWorkoutDto.finished_at) : undefined,
      },
    })
  }

  async findAll(user_uuid: string, query: WorkoutsQueryType) {
    const whereClause: any = {
      user_uuid,
    }

    if (query.from_date || query.to_date) {
      whereClause.started_at = {}

      if (query.from_date) {
        whereClause.started_at.gte = query.from_date
      }

      if (query.to_date) {
        whereClause.started_at.lte = query.to_date
      }
    }

    if (query.all) {
      return this.prisma.workout.findMany({
        where: whereClause,
        include: {
          entries: {
            include: {
              exercise: true,
              sets: true,
            },
          },
        },
        orderBy: {
          started_at: 'desc',
        },
      })
    }

    const page = query.page
    const limit = query.limit
    const skip = (page - 1) * limit

    const [workouts, total] = await Promise.all([
      this.prisma.workout.findMany({
        where: whereClause,
        include: {
          entries: {
            include: {
              exercise: true,
              sets: true,
            },
          },
        },
        orderBy: {
          started_at: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.workout.count({
        where: whereClause,
      }),
    ])

    return {
      data: workouts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(uuid: string, user_uuid: string) {
    const workout = await this.prisma.workout.findFirst({
      where: {
        uuid,
        user_uuid,
      },
      include: {
        entries: {
          include: {
            exercise: true,
            sets: true,
          },
        },
      },
    })

    if (!workout) {
      throw new NotFoundException('Workout not found')
    }

    return workout
  }

  async update(uuid: string, user_uuid: string, updateWorkoutDto: UpdateWorkoutDto) {
    const workout = await this.prisma.workout.findFirst({
      where: {
        uuid,
        user_uuid,
      },
    })

    if (!workout) {
      throw new NotFoundException('Workout not found or you do not have permission to update it')
    }

    return this.prisma.workout.update({
      where: { uuid },
      data: {
        name: updateWorkoutDto.name,
        notes: updateWorkoutDto.notes,
        started_at: updateWorkoutDto.started_at ? new Date(updateWorkoutDto.started_at) : undefined,
        finished_at: updateWorkoutDto.finished_at ? new Date(updateWorkoutDto.finished_at) : undefined,
      },
    })
  }

  async remove(uuid: string, user_uuid: string) {
    const workout = await this.prisma.workout.findFirst({
      where: {
        uuid,
        user_uuid,
      },
    })

    if (!workout) {
      throw new NotFoundException('Workout not found or you do not have permission to delete it')
    }

    return this.prisma.workout.delete({
      where: { uuid },
    })
  }
}
