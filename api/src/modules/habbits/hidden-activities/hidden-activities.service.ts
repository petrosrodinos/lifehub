import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateHiddenActivityDto } from './dto/create-hidden-activity.dto';
import { UpdateHiddenActivityDto } from './dto/update-hidden-activity.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { HiddenActivity } from '@/generated/prisma';

@Injectable()
export class HiddenActivitiesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, dto: CreateHiddenActivityDto): Promise<HiddenActivity> {
    const activity = await this.prisma.activity.findFirst({
      where: { uuid: dto.activity_uuid },
    });
    if (!activity) {
      throw new BadRequestException('Activity not found');
    }
    const existing = await this.prisma.hiddenActivity.findFirst({
      where: { user_uuid, activity_uuid: dto.activity_uuid },
    });
    if (existing) {
      throw new ConflictException('Activity is already hidden');
    }
    try {
      return await this.prisma.hiddenActivity.create({
        data: { user_uuid, activity_uuid: dto.activity_uuid },
      });
    } catch {
      throw new InternalServerErrorException('Failed to create hidden activity');
    }
  }

  async findAll(user_uuid: string): Promise<HiddenActivity[]> {
    try {
      return await this.prisma.hiddenActivity.findMany({
        where: { user_uuid },
        orderBy: { created_at: 'desc' },
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch hidden activities');
    }
  }

  async findOne(user_uuid: string, uuid: string): Promise<HiddenActivity> {
    const row = await this.prisma.hiddenActivity.findFirst({
      where: { uuid, user_uuid },
    });
    if (!row) {
      throw new NotFoundException('Hidden activity not found');
    }
    return row;
  }

  async update(user_uuid: string, uuid: string, dto: UpdateHiddenActivityDto): Promise<HiddenActivity> {
    await this.findOne(user_uuid, uuid);
    if (dto.activity_uuid !== undefined) {
      const activity = await this.prisma.activity.findFirst({
        where: { uuid: dto.activity_uuid },
      });
      if (!activity) {
        throw new BadRequestException('Activity not found');
      }
      const existing = await this.prisma.hiddenActivity.findFirst({
        where: { user_uuid, activity_uuid: dto.activity_uuid },
      });
      if (existing && existing.uuid !== uuid) {
        throw new ConflictException('Activity is already hidden');
      }
    }
    try {
      return await this.prisma.hiddenActivity.update({
        where: { uuid },
        data: dto,
      });
    } catch {
      throw new InternalServerErrorException('Failed to update hidden activity');
    }
  }

  async remove(user_uuid: string, uuid: string): Promise<HiddenActivity> {
    await this.findOne(user_uuid, uuid);
    try {
      return await this.prisma.hiddenActivity.delete({
        where: { uuid },
      });
    } catch {
      throw new InternalServerErrorException('Failed to delete hidden activity');
    }
  }
}
