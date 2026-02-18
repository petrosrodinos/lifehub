import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExerciseDto: CreateExerciseDto) {
    await this.validateMuscleGroupAccess(createExerciseDto.muscle_group_uuid, user_uuid)

    const existing = await this.prisma.exercise.findFirst({
      where: {
        user_uuid,
        name: createExerciseDto.name,
      },
    })

    if (existing) {
      throw new ConflictException('Exercise with this name already exists')
    }

    return this.prisma.exercise.create({
      data: {
        ...createExerciseDto,
        user_uuid,
      },
    })
  }

  async findAll(user_uuid: string) {
    return this.prisma.exercise.findMany({
      where: {
        OR: [{ user_uuid }, { user_uuid: null }],
      },
      include: {
        muscle_group: true,
      },
      orderBy: {
        created_at: 'asc',
      },
    })
  }

  async findOne(uuid: string, user_uuid: string) {
    const exercise = await this.prisma.exercise.findFirst({
      where: {
        uuid,
        OR: [{ user_uuid }, { user_uuid: null }],
      },
      include: {
        muscle_group: true,
      },
    })

    if (!exercise) {
      throw new NotFoundException('Exercise not found')
    }

    return exercise
  }

  async update(uuid: string, user_uuid: string, updateExerciseDto: UpdateExerciseDto) {
    const exercise = await this.prisma.exercise.findFirst({
      where: {
        uuid,
        user_uuid,
      },
    })

    if (!exercise) {
      throw new NotFoundException('Exercise not found or you do not have permission to update it')
    }

    if (updateExerciseDto.muscle_group_uuid) {
      await this.validateMuscleGroupAccess(updateExerciseDto.muscle_group_uuid, user_uuid)
    }

    if (updateExerciseDto.name) {
      const existing = await this.prisma.exercise.findFirst({
        where: {
          user_uuid,
          name: updateExerciseDto.name,
          uuid: { not: uuid },
        },
      })

      if (existing) {
        throw new ConflictException('Exercise with this name already exists')
      }
    }

    return this.prisma.exercise.update({
      where: { uuid },
      data: updateExerciseDto,
    })
  }

  async remove(uuid: string, user_uuid: string) {
    const exercise = await this.prisma.exercise.findFirst({
      where: {
        uuid,
        user_uuid,
      },
    })

    if (!exercise) {
      throw new NotFoundException('Exercise not found or you do not have permission to delete it')
    }

    return this.prisma.exercise.delete({
      where: { uuid },
    })
  }

  private async validateMuscleGroupAccess(muscle_group_uuid: string, user_uuid: string) {
    const muscleGroup = await this.prisma.muscleGroup.findFirst({
      where: {
        uuid: muscle_group_uuid,
        OR: [{ user_uuid }, { user_uuid: null }],
      },
    })

    if (!muscleGroup) {
      throw new NotFoundException('Muscle group not found')
    }
  }
}
