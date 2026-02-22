import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateExpenseReceiptItemDto } from './dto/create-expense-receipt-item.dto';
import { UpdateExpenseReceiptItemDto } from './dto/update-expense-receipt-item.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseReceiptItemService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseReceiptItemDto: CreateExpenseReceiptItemDto) {
    try {
      await this.validateReceiptOwnership(user_uuid, createExpenseReceiptItemDto.receipt_uuid);

      await this.validateCategoryRelations(user_uuid, createExpenseReceiptItemDto);

      return await this.prisma.expenseReceiptItem.create({
        data: {
          receipt_uuid: createExpenseReceiptItemDto.receipt_uuid,
          name: createExpenseReceiptItemDto.name,
          quantity: createExpenseReceiptItemDto.quantity ?? 1,
          unit_price: createExpenseReceiptItemDto.unit_price,
          total_price: createExpenseReceiptItemDto.total_price,
          category_uuid: createExpenseReceiptItemDto.category_uuid,
          subcategory_uuid: createExpenseReceiptItemDto.subcategory_uuid,
        },
        include: {
          category: true,
          subcategory: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create expense receipt item');
    }
  }

  async findAll(user_uuid: string, receipt_uuid: string) {
    try {
      await this.validateReceiptOwnership(user_uuid, receipt_uuid);

      return await this.prisma.expenseReceiptItem.findMany({
        where: { receipt_uuid },
        orderBy: { created_at: 'desc' },
        include: {
          category: true,
          subcategory: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch expense receipt items');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const item = await this.prisma.expenseReceiptItem.findFirst({
        where: { uuid },
        include: {
          receipt: true,
          category: true,
          subcategory: true,
        },
      });

      if (!item) {
        throw new NotFoundException('Expense receipt item not found');
      }

      await this.validateReceiptOwnership(user_uuid, item.receipt_uuid);

      return item;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch expense receipt item');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseReceiptItemDto: UpdateExpenseReceiptItemDto) {
    try {
      await this.findOne(user_uuid, uuid);

      if (Object.keys(updateExpenseReceiptItemDto).length > 0) {
        await this.validateCategoryRelations(user_uuid, updateExpenseReceiptItemDto);
      }

      return await this.prisma.expenseReceiptItem.update({
        where: { uuid },
        data: {
          name: updateExpenseReceiptItemDto.name,
          quantity: updateExpenseReceiptItemDto.quantity,
          unit_price: updateExpenseReceiptItemDto.unit_price,
          total_price: updateExpenseReceiptItemDto.total_price,
          category_uuid: updateExpenseReceiptItemDto.category_uuid,
          subcategory_uuid: updateExpenseReceiptItemDto.subcategory_uuid,
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

      throw new InternalServerErrorException('Failed to update expense receipt item');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseReceiptItem.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete expense receipt item');
    }
  }

  private async validateReceiptOwnership(user_uuid: string, receipt_uuid: string): Promise<void> {
    const receipt = await this.prisma.expenseReceipt.findFirst({
      where: { uuid: receipt_uuid, user_uuid },
    });

    if (!receipt) {
      throw new NotFoundException('Expense receipt not found or does not belong to user');
    }
  }

  private async validateCategoryRelations(user_uuid: string, dto: Partial<CreateExpenseReceiptItemDto>): Promise<void> {
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

      if (dto.category_uuid && subcategory.category_uuid !== dto.category_uuid) {
        throw new BadRequestException('Subcategory does not belong to the selected category');
      }
    }
  }
}
