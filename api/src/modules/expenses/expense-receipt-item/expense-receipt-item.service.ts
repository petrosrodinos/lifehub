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

      await this.validateProductRelation(user_uuid, createExpenseReceiptItemDto);

      return await this.prisma.expenseReceiptItem.create({
        data: {
          receipt_uuid: createExpenseReceiptItemDto.receipt_uuid,
          quantity: createExpenseReceiptItemDto.quantity ?? 1,
          unit_price: createExpenseReceiptItemDto.unit_price,
          total_price: createExpenseReceiptItemDto.total_price,
          product_uuid: createExpenseReceiptItemDto.product_uuid,
        },
        include: {
          product: true,
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
          product: true,
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
          product: true,
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
        await this.validateProductRelation(user_uuid, updateExpenseReceiptItemDto);
      }

      return await this.prisma.expenseReceiptItem.update({
        where: { uuid },
        data: {
          quantity: updateExpenseReceiptItemDto.quantity,
          unit_price: updateExpenseReceiptItemDto.unit_price,
          total_price: updateExpenseReceiptItemDto.total_price,
          product_uuid: updateExpenseReceiptItemDto.product_uuid,
        },
        include: {
          product: true,
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

  private async validateProductRelation(user_uuid: string, dto: Partial<CreateExpenseReceiptItemDto>): Promise<void> {
    if (dto.product_uuid) {
      const product = await this.prisma.expenseProduct.findFirst({
        where: {
          uuid: dto.product_uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
      });

      if (!product) {
        throw new BadRequestException('Product not found or does not belong to user');
      }
    }
  }
}
