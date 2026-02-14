import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'
import { CreateScheduleSlotDto } from '../dto/create-schedule-slot.dto'
import { UpdateScheduleSlotDto } from '../dto/update-schedule-slot.dto'
import { ScheduleDay } from '@/shared/config/schedule/schedule-days.config'

@Injectable()
export class ScheduleSlotsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateScheduleSlotDto, userUuid: string) {
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
        is_default: dto.is_default || false,
        user_uuid: userUuid,
      },
      include: {
        activity: true,
      },
    })
  }

  async findAll(userUuid: string, day: ScheduleDay) {
    return this.prisma.scheduleSlot.findMany({
      where: {
        OR: [
          { user_uuid: userUuid },
          { is_default: true },
        ],
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

  async findByDay(day: ScheduleDay, userUuid: string) {
    return this.prisma.scheduleSlot.findMany({
      where: {
        day,
        OR: [
          { user_uuid: userUuid },
          { is_default: true },
        ],
      },
      include: {
        activity: true,
      },
      orderBy: {
        start_time: 'asc',
      },
    })
  }

  async findOne(uuid: string, userUuid: string) {
    const slot = await this.prisma.scheduleSlot.findFirst({
      where: {
        uuid,
        OR: [
          { user_uuid: userUuid },
          { is_default: true },
        ],
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

  async update(uuid: string, dto: UpdateScheduleSlotDto, userUuid: string) {
    const slot = await this.prisma.scheduleSlot.findFirst({
      where: {
        uuid,
        user_uuid: userUuid,
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

  async remove(uuid: string, userUuid: string) {
    const slot = await this.prisma.scheduleSlot.findFirst({
      where: {
        uuid,
        user_uuid: userUuid,
      },
    })

    if (!slot) {
      throw new NotFoundException('Schedule slot not found or you do not have permission to delete it')
    }

    return this.prisma.scheduleSlot.delete({
      where: { uuid },
    })
  }


  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
}
