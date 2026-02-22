import { Injectable, Logger, NotFoundException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { AuthRoles, type AuthRole } from '@/modules/auth/interfaces/auth.interface';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { EXPENSE_CATEGORIES_SEED } from './constants/expense-categories-seed.constants';

@Injectable()
export class ExpenseCategoriesService {
  private readonly logger = new Logger(ExpenseCategoriesService.name);

  constructor(private readonly prisma: PrismaService) { }

  async seedDefaults(): Promise<{ categoriesCreated: number; subcategoriesCreated: number }> {
    const existingCategories = await this.prisma.expenseCategory.findMany({
      where: { user_uuid: null },
      include: { subcategories: true },
    });

    const existingCategoryNames = new Set(existingCategories.map((c) => c.name));

    const existingSubcategoryNames = new Map<string, Set<string>>();

    for (const category of existingCategories) {
      const subcatNames = new Set(category.subcategories.map((s) => s.name));

      existingSubcategoryNames.set(category.name, subcatNames);
    }

    let categoriesCreated = 0;
    let subcategoriesCreated = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const seed of EXPENSE_CATEGORIES_SEED) {
        let categoryUuid: string;

        if (existingCategoryNames.has(seed.name)) {
          const existing = existingCategories.find((c) => c.name === seed.name);

          categoryUuid = existing!.uuid;
        } else {
          const created = await tx.expenseCategory.create({
            data: {
              name: seed.name,
              icon: seed.icon,
              color: seed.color,
              user_uuid: null,
            },
          });

          categoryUuid = created.uuid;
          categoriesCreated++;
        }

        const existingSubcats = existingSubcategoryNames.get(seed.name) ?? new Set<string>();

        for (const subcategoryName of seed.subcategories) {
          if (existingSubcats.has(subcategoryName)) {
            continue;
          }

          await tx.expenseSubcategory.create({
            data: {
              name: subcategoryName,
              category_uuid: categoryUuid,
              user_uuid: null,
            },
          });

          subcategoriesCreated++;
        }
      }
    }, { timeout: 30000 });

    this.logger.log(`Seeded ${categoriesCreated} categories and ${subcategoriesCreated} subcategories`);

    return { categoriesCreated, subcategoriesCreated };
  }

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
        where: {
          OR: [
            { user_uuid },
            { user_uuid: null }
          ]
        },
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
        where: {
          uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
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

  async update(user_uuid: string, uuid: string, role: AuthRole, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    try {
      const category = await this.findOne(user_uuid, uuid);

      if (!category.user_uuid && role !== AuthRoles.ADMIN) {
        throw new ForbiddenException('Only admins can edit platform categories');
      }

      return await this.prisma.expenseCategory.update({
        where: { uuid },
        data: updateExpenseCategoryDto,
      });

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update expense category');
    }
  }

  async remove(user_uuid: string, uuid: string, role: AuthRole) {
    try {
      const category = await this.findOne(user_uuid, uuid);

      if (!category.user_uuid && role !== AuthRoles.ADMIN) {
        throw new ForbiddenException('Only admins can delete platform categories');
      }

      return await this.prisma.expenseCategory.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete expense category');
    }
  }
}
