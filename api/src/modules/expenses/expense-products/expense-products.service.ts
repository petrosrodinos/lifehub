import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateExpenseProductDto } from './dto/create-expense-product.dto';
import { UpdateExpenseProductDto } from './dto/update-expense-product.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseProductDto: CreateExpenseProductDto) {
    try {
      await this.validateRelations(user_uuid, createExpenseProductDto);

      return await this.prisma.expenseProduct.create({
        data: {
          user_uuid,
          name: createExpenseProductDto.name,
          brand: createExpenseProductDto.brand,
          unit: createExpenseProductDto.unit,
          size: createExpenseProductDto.size,
          category_uuid: createExpenseProductDto.category_uuid,
          subcategory_uuid: createExpenseProductDto.subcategory_uuid,
        },
        include: {
          category: true,
          subcategory: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create expense product');
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.expenseProduct.findMany({
        where: {
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
        orderBy: { name: 'asc' },
        include: {
          category: true,
          subcategory: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense products');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const product = await this.prisma.expenseProduct.findFirst({
        where: {
          uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
        include: {
          category: true,
          subcategory: true,
        },
      });

      if (!product) {
        throw new NotFoundException('Expense product not found');
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch expense product');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseProductDto: UpdateExpenseProductDto) {
    try {
      await this.findOne(user_uuid, uuid);

      if (Object.keys(updateExpenseProductDto).length > 0) {
        await this.validateRelations(user_uuid, updateExpenseProductDto);
      }

      return await this.prisma.expenseProduct.update({
        where: { uuid },
        data: {
          name: updateExpenseProductDto.name,
          brand: updateExpenseProductDto.brand,
          unit: updateExpenseProductDto.unit,
          size: updateExpenseProductDto.size,
          category_uuid: updateExpenseProductDto.category_uuid,
          subcategory_uuid: updateExpenseProductDto.subcategory_uuid,
        },
        include: {
          category: true,
          subcategory: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update expense product');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseProduct.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete expense product');
    }
  }

  private async validateRelations(user_uuid: string, dto: Partial<CreateExpenseProductDto>): Promise<void> {
    if (dto.category_uuid) {
      const category = await this.prisma.expenseCategory.findFirst({
        where: {
          uuid: dto.category_uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
      });

      if (!category) {
        throw new BadRequestException('Category not found or does not belong to user');
      }
    }

    if (dto.subcategory_uuid) {
      const subcategory = await this.prisma.expenseSubcategory.findFirst({
        where: {
          uuid: dto.subcategory_uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
      });

      if (!subcategory) {
        throw new BadRequestException('Subcategory not found or does not belong to user');
      }
    }
  }
}
