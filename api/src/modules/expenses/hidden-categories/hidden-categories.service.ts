import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateHiddenCategoryDto } from './dto/create-hidden-category.dto';
import { UpdateHiddenCategoryDto } from './dto/update-hidden-category.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { HiddenCategory } from '@/generated/prisma';

@Injectable()
export class HiddenCategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, dto: CreateHiddenCategoryDto): Promise<HiddenCategory> {
    const category = await this.prisma.expenseCategory.findFirst({
      where: {
        uuid: dto.category_uuid,
        OR: [{ user_uuid }, { user_uuid: null }],
      },
    });
    if (!category) {
      throw new BadRequestException('Category not found or not accessible');
    }
    const existing = await this.prisma.hiddenCategory.findFirst({
      where: { user_uuid, category_uuid: dto.category_uuid },
    });
    if (existing) {
      throw new ConflictException('Category is already hidden');
    }
    try {
      return await this.prisma.hiddenCategory.create({
        data: { user_uuid, category_uuid: dto.category_uuid },
      });
    } catch {
      throw new InternalServerErrorException('Failed to create hidden category');
    }
  }

  async findAll(user_uuid: string): Promise<HiddenCategory[]> {
    try {
      return await this.prisma.hiddenCategory.findMany({
        where: { user_uuid },
        orderBy: { created_at: 'desc' },
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch hidden categories');
    }
  }

  async findOne(user_uuid: string, uuid: string): Promise<HiddenCategory> {
    const row = await this.prisma.hiddenCategory.findFirst({
      where: { uuid, user_uuid },
    });
    if (!row) {
      throw new NotFoundException('Hidden category not found');
    }
    return row;
  }

  async update(user_uuid: string, uuid: string, dto: UpdateHiddenCategoryDto): Promise<HiddenCategory> {
    await this.findOne(user_uuid, uuid);
    if (dto.category_uuid !== undefined) {
      const category = await this.prisma.expenseCategory.findFirst({
        where: {
          uuid: dto.category_uuid,
          OR: [{ user_uuid }, { user_uuid: null }],
        },
      });
      if (!category) {
        throw new BadRequestException('Category not found or not accessible');
      }
      const existing = await this.prisma.hiddenCategory.findFirst({
        where: { user_uuid, category_uuid: dto.category_uuid },
      });
      if (existing && existing.uuid !== uuid) {
        throw new ConflictException('Category is already hidden');
      }
    }
    try {
      return await this.prisma.hiddenCategory.update({
        where: { uuid },
        data: dto,
      });
    } catch {
      throw new InternalServerErrorException('Failed to update hidden category');
    }
  }

  async remove(user_uuid: string, uuid: string): Promise<HiddenCategory> {
    await this.findOne(user_uuid, uuid);
    try {
      return await this.prisma.hiddenCategory.delete({
        where: { uuid },
      });
    } catch {
      throw new InternalServerErrorException('Failed to delete hidden category');
    }
  }
}
