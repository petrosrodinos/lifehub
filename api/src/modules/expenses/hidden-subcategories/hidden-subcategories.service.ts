import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateHiddenSubcategoryDto } from './dto/create-hidden-subcategory.dto';
import { UpdateHiddenSubcategoryDto } from './dto/update-hidden-subcategory.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { HiddenSubcategory } from '@/generated/prisma';

@Injectable()
export class HiddenSubcategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, dto: CreateHiddenSubcategoryDto): Promise<HiddenSubcategory> {
    const subcategory = await this.prisma.expenseSubcategory.findFirst({
      where: {
        uuid: dto.subcategory_uuid,
        OR: [{ user_uuid }, { user_uuid: null }],
      },
    });
    if (!subcategory) {
      throw new BadRequestException('Subcategory not found or not accessible');
    }
    const existing = await this.prisma.hiddenSubcategory.findFirst({
      where: { user_uuid, subcategory_uuid: dto.subcategory_uuid },
    });
    if (existing) {
      throw new ConflictException('Subcategory is already hidden');
    }
    try {
      return await this.prisma.hiddenSubcategory.create({
        data: { user_uuid, subcategory_uuid: dto.subcategory_uuid },
      });
    } catch {
      throw new InternalServerErrorException('Failed to create hidden subcategory');
    }
  }

  async findAll(user_uuid: string): Promise<HiddenSubcategory[]> {
    try {
      return await this.prisma.hiddenSubcategory.findMany({
        where: { user_uuid },
        orderBy: { created_at: 'desc' },
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch hidden subcategories');
    }
  }

  async findOne(user_uuid: string, uuid: string): Promise<HiddenSubcategory> {
    const row = await this.prisma.hiddenSubcategory.findFirst({
      where: { uuid, user_uuid },
    });
    if (!row) {
      throw new NotFoundException('Hidden subcategory not found');
    }
    return row;
  }

  async update(user_uuid: string, uuid: string, dto: UpdateHiddenSubcategoryDto): Promise<HiddenSubcategory> {
    await this.findOne(user_uuid, uuid);
    if (dto.subcategory_uuid !== undefined) {
      const subcategory = await this.prisma.expenseSubcategory.findFirst({
        where: {
          uuid: dto.subcategory_uuid,
          OR: [{ user_uuid }, { user_uuid: null }],
        },
      });
      if (!subcategory) {
        throw new BadRequestException('Subcategory not found or not accessible');
      }
      const existing = await this.prisma.hiddenSubcategory.findFirst({
        where: { user_uuid, subcategory_uuid: dto.subcategory_uuid },
      });
      if (existing && existing.uuid !== uuid) {
        throw new ConflictException('Subcategory is already hidden');
      }
    }
    try {
      return await this.prisma.hiddenSubcategory.update({
        where: { uuid },
        data: dto,
      });
    } catch {
      throw new InternalServerErrorException('Failed to update hidden subcategory');
    }
  }

  async remove(user_uuid: string, uuid: string): Promise<HiddenSubcategory> {
    await this.findOne(user_uuid, uuid);
    try {
      return await this.prisma.hiddenSubcategory.delete({
        where: { uuid },
      });
    } catch {
      throw new InternalServerErrorException('Failed to delete hidden subcategory');
    }
  }
}
