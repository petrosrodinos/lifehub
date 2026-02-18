import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateWorkoutEntryDto } from './dto/create-workout-entry.dto'
import { UpdateWorkoutEntryDto } from './dto/update-workout-entry.dto'
import type { WorkoutEntriesQueryType } from './schemas/workout-entries-query.schema'
import type { WorkoutEntriesAnalyticsQueryType } from './schemas/workout-entries-analytics-query.schema'

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

  async findAll(user_uuid: string, query: WorkoutEntriesQueryType) {
    return this.prisma.workoutEntry.findMany({
      where: {
        workout: {
          user_uuid,
        },
        ...(query.exercise_uuid && { exercise_uuid: query.exercise_uuid }),
        ...(query.workout_uuid && { workout_uuid: query.workout_uuid }),
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

  async getAnalytics(user_uuid: string, query: WorkoutEntriesAnalyticsQueryType) {
    const entries = await this.prisma.workoutEntry.findMany({
      where: {
        exercise_uuid: query.exercise_uuid,
        workout: {
          user_uuid,
          ...(query.start_date || query.end_date
            ? {
              started_at: {
                ...(query.start_date && { gte: new Date(query.start_date) }),
                ...(query.end_date && { lte: new Date(query.end_date) }),
              },
            }
            : {}),
        },
      },
      include: {
        workout: {
          select: {
            started_at: true,
          },
        },
        sets: {
          where: {
            is_warmup: false,
            is_cooldown: false,
            is_rest: false,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        workout: {
          started_at: 'asc',
        },
      },
    })

    return entries.map((entry) => {
      const weights = entry.sets
        .map((s) => Number(s.weight) || 0)
        .filter((w) => w > 0)

      const reps = entry.sets
        .map((s) => s.reps || 0)
        .filter((r) => r > 0)

      const totalVolume = entry.sets.reduce((sum, s) => {
        const w = Number(s.weight) || 0
        const r = s.reps || 0
        return sum + w * r
      }, 0)

      const totalDuration = entry.sets.reduce((sum, s) => {
        return sum + (s.duration_seconds || 0)
      }, 0)

      return {
        date: entry.workout.started_at.toISOString(),
        max_weight: weights.length > 0 ? Math.max(...weights) : null,
        max_reps: reps.length > 0 ? Math.max(...reps) : null,
        total_volume: totalVolume > 0 ? totalVolume : null,
        total_sets: entry.sets.length,
        total_duration: totalDuration > 0 ? totalDuration : null,
      }
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
