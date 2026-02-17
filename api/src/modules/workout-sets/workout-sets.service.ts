import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateWorkoutSetDto } from './dto/create-workout-set.dto'
import { UpdateWorkoutSetDto } from './dto/update-workout-set.dto'

@Injectable()
export class WorkoutSetsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createWorkoutSetDto: CreateWorkoutSetDto) {
    await this.validateWorkoutEntryAccess(createWorkoutSetDto.workout_entry_uuid, user_uuid)

    return this.prisma.workoutSet.create({
      data: createWorkoutSetDto,
      include: {
        workout_entry: {
          include: {
            workout: true,
            exercise: {
              include: {
                muscle_group: true,
              },
            },
          },
        },
      },
    })
  }

  async findAll(user_uuid: string) {
    return this.prisma.workoutSet.findMany({
      where: {
        workout_entry: {
          workout: {
            user_uuid,
          },
        },
      },
      include: {
        workout_entry: {
          include: {
            workout: true,
            exercise: {
              include: {
                muscle_group: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          workout_entry: {
            workout: {
              started_at: 'desc',
            },
          },
        },
        {
          order: 'asc',
        },
      ],
    })
  }

  async findOne(uuid: string, user_uuid: string) {
    const workoutSet = await this.prisma.workoutSet.findFirst({
      where: {
        uuid,
        workout_entry: {
          workout: {
            user_uuid,
          },
        },
      },
      include: {
        workout_entry: {
          include: {
            workout: true,
            exercise: {
              include: {
                muscle_group: true,
              },
            },
          },
        },
      },
    })

    if (!workoutSet) {
      throw new NotFoundException('Workout set not found')
    }

    return workoutSet
  }

  async update(uuid: string, user_uuid: string, updateWorkoutSetDto: UpdateWorkoutSetDto) {
    await this.findOne(uuid, user_uuid)

    if (updateWorkoutSetDto.workout_entry_uuid) {
      await this.validateWorkoutEntryAccess(updateWorkoutSetDto.workout_entry_uuid, user_uuid)
    }

    return this.prisma.workoutSet.update({
      where: { uuid },
      data: updateWorkoutSetDto,
      include: {
        workout_entry: {
          include: {
            workout: true,
            exercise: {
              include: {
                muscle_group: true,
              },
            },
          },
        },
      },
    })
  }

  async remove(uuid: string, user_uuid: string) {
    await this.findOne(uuid, user_uuid)

    return this.prisma.workoutSet.delete({
      where: { uuid },
    })
  }

  private async validateWorkoutEntryAccess(workout_entry_uuid: string, user_uuid: string) {
    const workoutEntry = await this.prisma.workoutEntry.findFirst({
      where: {
        uuid: workout_entry_uuid,
        workout: {
          user_uuid,
        },
      },
    })

    if (!workoutEntry) {
      throw new NotFoundException('Workout entry not found')
    }
  }
}
