import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateWorkoutEntryDto } from './dto/create-workout-entry.dto'
import { UpdateWorkoutEntryDto } from './dto/update-workout-entry.dto'

@Injectable()
export class WorkoutEntriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createWorkoutEntryDto: CreateWorkoutEntryDto) {
    await this.validateWorkoutAccess(createWorkoutEntryDto.workout_uuid, user_uuid)
    await this.validateExerciseAccess(createWorkoutEntryDto.exercise_uuid, user_uuid)

    return this.prisma.workoutEntry.create({
      data: createWorkoutEntryDto,
      include: {
        workout: true,
        exercise: {
          include: {
            muscle_group: true,
          },
        },
        sets: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
  }

  async findAll(user_uuid: string) {
    return this.prisma.workoutEntry.findMany({
      where: {
        workout: {
          user_uuid,
        },
      },
      include: {
        workout: true,
        exercise: {
          include: {
            muscle_group: true,
          },
        },
        sets: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: [
        {
          workout: {
            started_at: 'desc',
          },
        },
        {
          order: 'asc',
        },
      ],
    })
  }

  async findOne(uuid: string, user_uuid: string) {
    const workoutEntry = await this.prisma.workoutEntry.findFirst({
      where: {
        uuid,
        workout: {
          user_uuid,
        },
      },
      include: {
        workout: true,
        exercise: {
          include: {
            muscle_group: true,
          },
        },
        sets: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    if (!workoutEntry) {
      throw new NotFoundException('Workout entry not found')
    }

    return workoutEntry
  }

  async update(uuid: string, user_uuid: string, updateWorkoutEntryDto: UpdateWorkoutEntryDto) {
    await this.findOne(uuid, user_uuid)

    if (updateWorkoutEntryDto.workout_uuid) {
      await this.validateWorkoutAccess(updateWorkoutEntryDto.workout_uuid, user_uuid)
    }

    if (updateWorkoutEntryDto.exercise_uuid) {
      await this.validateExerciseAccess(updateWorkoutEntryDto.exercise_uuid, user_uuid)
    }

    return this.prisma.workoutEntry.update({
      where: { uuid },
      data: updateWorkoutEntryDto,
      include: {
        workout: true,
        exercise: {
          include: {
            muscle_group: true,
          },
        },
        sets: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
  }

  async remove(uuid: string, user_uuid: string) {
    await this.findOne(uuid, user_uuid)

    return this.prisma.workoutEntry.delete({
      where: { uuid },
    })
  }

  private async validateWorkoutAccess(workout_uuid: string, user_uuid: string) {
    const workout = await this.prisma.workout.findFirst({
      where: {
        uuid: workout_uuid,
        user_uuid,
      },
    })

    if (!workout) {
      throw new NotFoundException('Workout not found')
    }
  }

  private async validateExerciseAccess(exercise_uuid: string, user_uuid: string) {
    const exercise = await this.prisma.exercise.findFirst({
      where: {
        uuid: exercise_uuid,
        user_uuid,
      },
    })

    if (!exercise) {
      throw new NotFoundException('Exercise not found')
    }
  }
}
