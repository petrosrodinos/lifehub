import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { AuthRoles, type AuthRole } from '@/modules/auth/interfaces/auth.interface';
import { CreateExpenseSubcategoryDto } from './dto/create-expense-subcategory.dto';
import { UpdateExpenseSubcategoryDto } from './dto/update-expense-subcategory.dto';
import { PrismaService } from '../../../core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseSubcategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseSubcategoryDto: CreateExpenseSubcategoryDto) {
    try {
      const category = await this.prisma.expenseCategory.findFirst({
        where: {
          uuid: createExpenseSubcategoryDto.category_uuid,
          OR: [{ user_uuid }, { user_uuid: null }],
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
        where: {
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
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
        where: {
          uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
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

  async update(user_uuid: string, uuid: string, role: AuthRole, updateExpenseSubcategoryDto: UpdateExpenseSubcategoryDto) {
    try {
      const subcategory = await this.findOne(user_uuid, uuid);

      if (!subcategory.user_uuid && role !== AuthRoles.ADMIN) {
        throw new ForbiddenException('Only admins can edit platform subcategories');
      }

      if (updateExpenseSubcategoryDto.category_uuid) {
        const category = await this.prisma.expenseCategory.findFirst({
          where: {
            uuid: updateExpenseSubcategoryDto.category_uuid,
            OR: [{ user_uuid }, { user_uuid: null }],
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
      if (error instanceof NotFoundException || error instanceof BadRequestException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update expense subcategory');
    }
  }

  async remove(user_uuid: string, uuid: string, role: AuthRole) {
    try {
      const subcategory = await this.findOne(user_uuid, uuid);

      if (!subcategory.user_uuid && role !== AuthRoles.ADMIN) {
        throw new ForbiddenException('Only admins can delete platform subcategories');
      }

      return await this.prisma.expenseSubcategory.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete expense subcategory');
    }
  }
}
