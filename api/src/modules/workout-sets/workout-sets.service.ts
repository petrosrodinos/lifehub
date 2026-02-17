import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateWorkoutSetDto } from './dto/create-workout-set.dto'
import { UpdateWorkoutSetDto } from './dto/update-workout-set.dto'

@Injectable()
export class WorkoutSetsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createWorkoutSetDto: CreateWorkoutSetDto) {
    await this.validateWorkoutAccess(createWorkoutSetDto.workout_uuid, user_uuid)
    await this.validateExerciseAccess(createWorkoutSetDto.exercise_uuid, user_uuid)

    return this.prisma.workoutSet.create({
      data: createWorkoutSetDto,
      include: {
        workout: true,
        exercise: true,
      },
    })
  }

  async findAll(user_uuid: string) {
    return this.prisma.workoutSet.findMany({
      where: {
        workout: {
          user_uuid,
        },
      },
      include: {
        workout: true,
        exercise: true,
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
    const workoutSet = await this.prisma.workoutSet.findFirst({
      where: {
        uuid,
        workout: {
          user_uuid,
        },
      },
      include: {
        workout: true,
        exercise: true,
      },
    })

    if (!workoutSet) {
      throw new NotFoundException('Workout set not found')
    }

    return workoutSet
  }

  async update(uuid: string, user_uuid: string, updateWorkoutSetDto: UpdateWorkoutSetDto) {
    await this.findOne(uuid, user_uuid)

    if (updateWorkoutSetDto.workout_uuid) {
      await this.validateWorkoutAccess(updateWorkoutSetDto.workout_uuid, user_uuid)
    }

    if (updateWorkoutSetDto.exercise_uuid) {
      await this.validateExerciseAccess(updateWorkoutSetDto.exercise_uuid, user_uuid)
    }

    return this.prisma.workoutSet.update({
      where: { uuid },
      data: updateWorkoutSetDto,
      include: {
        workout: true,
        exercise: true,
      },
    })
  }

  async remove(uuid: string, user_uuid: string) {
    await this.findOne(uuid, user_uuid)

    return this.prisma.workoutSet.delete({
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
        OR: [{ user_uuid }, { user_uuid: null }],
      },
    })

    if (!exercise) {
      throw new NotFoundException('Exercise not found')
    }
  }
}
