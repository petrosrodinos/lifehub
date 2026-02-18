import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseCategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseCategoryDto: CreateExpenseCategoryDto) {
    try {
      return await this.prisma.expenseCategory.create({
        data: {
          user_uuid,
          name: createExpenseCategoryDto.name,
          icon: createExpenseCategoryDto.icon,
          color: createExpenseCategoryDto.color,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create expense category');
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.expenseCategory.findMany({
        where: { user_uuid },
        orderBy: { created_at: 'desc' },
        include: {
          subcategories: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense categories');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const category = await this.prisma.expenseCategory.findFirst({
        where: { uuid, user_uuid },
        include: {
          subcategories: true,
        },
      });

      if (!category) {
        throw new NotFoundException('Expense category not found');
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch expense category');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseCategory.update({
        where: { uuid },
        data: updateExpenseCategoryDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update expense category');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseCategory.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete expense category');
    }
  }
}
