import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'
import { MUSCLE_GROUPS_SEED } from './constants/muscle-groups-seed.constants'

@Injectable()
export class MuscleGroupsService {
  private readonly logger = new Logger(MuscleGroupsService.name)

  constructor(private readonly prisma: PrismaService) { }

  async seedDefaults(): Promise<{ muscleGroupsCreated: number; exercisesCreated: number }> {

    const existingGroups = await this.prisma.muscleGroup.findMany({
      where: { user_uuid: null },
      include: { exercises: true },
    })

    const existingGroupNames = new Set(existingGroups.map((g) => g.name))

    const existingExerciseNames = new Map<string, Set<string>>()

    for (const group of existingGroups) {
      const exerciseNames = new Set(group.exercises.map((e) => e.name))

      existingExerciseNames.set(group.name, exerciseNames)
    }

    let muscleGroupsCreated = 0
    let exercisesCreated = 0

    await this.prisma.$transaction(async (tx) => {
      for (const seed of MUSCLE_GROUPS_SEED) {
        let groupUuid: string

        if (existingGroupNames.has(seed.name)) {
          const existing = existingGroups.find((g) => g.name === seed.name)

          groupUuid = existing!.uuid
        } else {
          const created = await tx.muscleGroup.create({
            data: {
              name: seed.name,
              color: seed.color,
              user_uuid: null,
            },
          })

          groupUuid = created.uuid
          muscleGroupsCreated++
        }

        const existingExercises = existingExerciseNames.get(seed.name) ?? new Set<string>()

        for (const exercise of seed.exercises) {
          if (existingExercises.has(exercise.name)) {
            continue
          }

          await tx.exercise.create({
            data: {
              name: exercise.name,
              type: exercise.type,
              muscle_group_uuid: groupUuid,
              user_uuid: null,
            },
          })

          exercisesCreated++
        }
      }
    }, { timeout: 30000 })

    this.logger.log(`Seeded ${muscleGroupsCreated} muscle groups and ${exercisesCreated} exercises`)

    return { muscleGroupsCreated, exercisesCreated }
  }

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
