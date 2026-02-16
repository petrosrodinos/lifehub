import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateScheduleSlotDto } from '../dto/create-schedule-slot.dto'
import { UpdateScheduleSlotDto } from '../dto/update-schedule-slot.dto'
import { DuplicateDayDto } from '../dto/duplicate-day.dto'
import { DuplicateSlotDto } from '../dto/duplicate-slot.dto'
import { ScheduleDay } from '@/shared/config/schedule/schedule-days.config'

@Injectable()
export class ScheduleSlotsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateScheduleSlotDto, user_uuid: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { uuid: dto.activity_uuid },
    })

    if (!activity) {
      throw new BadRequestException('Activity not found')
    }

    const startMinutes = this.timeToMinutes(dto.start_time)
    const endMinutes = this.timeToMinutes(dto.end_time)

    if (startMinutes >= endMinutes) {
      throw new BadRequestException('Start time must be before end time')
    }

    return this.prisma.scheduleSlot.create({
      data: {
        day: dto.day,
        start_time: dto.start_time,
        end_time: dto.end_time,
        activity_uuid: dto.activity_uuid,
        user_uuid: user_uuid,
      },
      include: {
        activity: true,
      },
    })
  }

  async findAll(user_uuid: string, day: ScheduleDay) {
    return this.prisma.scheduleSlot.findMany({
      where: {
        user_uuid: user_uuid,
        ...(day && { day }),
      },
      include: {
        activity: true,
      },
      orderBy: [
        { day: 'asc' },
        { start_time: 'asc' },
      ],
    })
  }

  async findByDay(day: ScheduleDay, user_uuid: string) {
    return this.prisma.scheduleSlot.findMany({
      where: {
        day,
        user_uuid: user_uuid,
      },
      include: {
        activity: true,
      },
      orderBy: {
        start_time: 'asc',
      },
    })
  }

  async findOne(uuid: string, user_uuid: string) {
    const slot = await this.prisma.scheduleSlot.findFirst({
      where: {
        uuid,
        user_uuid: user_uuid,
      },
      include: {
        activity: true,
      },
    })

    if (!slot) {
      throw new NotFoundException('Schedule slot not found')
    }

    return slot
  }

  async update(uuid: string, dto: UpdateScheduleSlotDto, user_uuid: string) {
    const slot = await this.prisma.scheduleSlot.findFirst({
      where: {
        uuid,
        user_uuid: user_uuid,
      },
    })

    if (!slot) {
      throw new NotFoundException('Schedule slot not found or you do not have permission to update it')
    }

    if (dto.activity_uuid) {
      const activity = await this.prisma.activity.findUnique({
        where: { uuid: dto.activity_uuid },
      })

      if (!activity) {
        throw new BadRequestException('Activity not found')
      }
    }

    if (dto.start_time || dto.end_time) {
      const startTime = dto.start_time || slot.start_time
      const endTime = dto.end_time || slot.end_time
      const startMinutes = this.timeToMinutes(startTime)
      const endMinutes = this.timeToMinutes(endTime)

      if (startMinutes >= endMinutes) {
        throw new BadRequestException('Start time must be before end time')
      }
    }

    return this.prisma.scheduleSlot.update({
      where: { uuid },
      data: dto,
      include: {
        activity: true,
      },
    })
  }

  async remove(uuid: string, user_uuid: string) {
    const slot = await this.prisma.scheduleSlot.findFirst({
      where: {
        uuid,
        user_uuid: user_uuid,
      },
    })

    if (!slot) {
      throw new NotFoundException('Schedule slot not found or you do not have permission to delete it')
    }

    return this.prisma.scheduleSlot.delete({
      where: { uuid },
    })
  }

  async duplicateDay(dto: DuplicateDayDto, user_uuid: string) {
    if (dto.target_days.includes(dto.source_day)) {
      throw new BadRequestException('Source day cannot be in target days')
    }

    const sourceSlots = await this.prisma.scheduleSlot.findMany({
      where: {
        day: dto.source_day,
        user_uuid: user_uuid,
      },
      include: {
        activity: true,
      },
    })

    if (sourceSlots.length === 0) {
      throw new NotFoundException('No slots found for the source day')
    }

    await this.prisma.scheduleSlot.deleteMany({
      where: {
        day: { in: dto.target_days },
        user_uuid: user_uuid,
      },
    })

    const duplicatedSlots = await this.prisma.$transaction(
      dto.target_days.flatMap((targetDay) =>
        sourceSlots.map((slot) =>
          this.prisma.scheduleSlot.create({
            data: {
              day: targetDay,
              start_time: slot.start_time,
              end_time: slot.end_time,
              activity_uuid: slot.activity_uuid,
              user_uuid: user_uuid,
            },
            include: {
              activity: true,
            },
          }),
        ),
      ),
    )

    return duplicatedSlots
  }

  async duplicateSlot(dto: DuplicateSlotDto, user_uuid: string) {
    const sourceSlot = await this.prisma.scheduleSlot.findFirst({
      where: {
        uuid: dto.slot_uuid,
        user_uuid: user_uuid,
      },
      include: {
        activity: true,
      },
    })

    if (!sourceSlot) {
      throw new NotFoundException('Schedule slot not found or you do not have permission to access it')
    }

    const duplicatedSlots = await this.prisma.$transaction(
      dto.target_days.map((targetDay) =>
        this.prisma.scheduleSlot.create({
          data: {
            day: targetDay,
            start_time: sourceSlot.start_time,
            end_time: sourceSlot.end_time,
            activity_uuid: sourceSlot.activity_uuid,
            user_uuid: user_uuid,
          },
          include: {
            activity: true,
          },
        }),
      ),
    )

    return duplicatedSlots
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
}
