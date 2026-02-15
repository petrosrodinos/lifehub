import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateExpenseSubcategoryDto } from './dto/create-expense-subcategory.dto';
import { UpdateExpenseSubcategoryDto } from './dto/update-expense-subcategory.dto';
import { PrismaService } from '../../core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseSubcategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_uuid: string, createExpenseSubcategoryDto: CreateExpenseSubcategoryDto) {
    try {
      const category = await this.prisma.expenseCategory.findFirst({
        where: {
          uuid: createExpenseSubcategoryDto.category_uuid,
          user_uuid,
        },
      });

      if (!category) {
        throw new BadRequestException('Category not found or does not belong to user');
      }

      return await this.prisma.expenseSubcategory.create({
        data: {
          user_uuid,
          category_uuid: createExpenseSubcategoryDto.category_uuid,
          name: createExpenseSubcategoryDto.name,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create expense subcategory');
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.expenseSubcategory.findMany({
        where: { user_uuid },
        orderBy: { created_at: 'desc' },
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense subcategories');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const subcategory = await this.prisma.expenseSubcategory.findFirst({
        where: { uuid, user_uuid },
        include: {
          category: true,
        },
      });

      if (!subcategory) {
        throw new NotFoundException('Expense subcategory not found');
      }

      return subcategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch expense subcategory');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseSubcategoryDto: UpdateExpenseSubcategoryDto) {
    try {
      await this.findOne(user_uuid, uuid);

      if (updateExpenseSubcategoryDto.category_uuid) {
        const category = await this.prisma.expenseCategory.findFirst({
          where: {
            uuid: updateExpenseSubcategoryDto.category_uuid,
            user_uuid,
          },
        });

        if (!category) {
          throw new BadRequestException('Category not found or does not belong to user');
        }
      }

      return await this.prisma.expenseSubcategory.update({
        where: { uuid },
        data: updateExpenseSubcategoryDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update expense subcategory');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseSubcategory.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete expense subcategory');
    }
  }
}
