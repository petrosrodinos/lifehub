import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateExpenseReceiptDto } from './dto/create-expense-receipt.dto';
import { UpdateExpenseReceiptDto } from './dto/update-expense-receipt.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseReceiptService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseReceiptDto: CreateExpenseReceiptDto) {
    try {
      await this.validateRelations(user_uuid, createExpenseReceiptDto);

      return await this.prisma.expenseReceipt.create({
        data: {
          user_uuid,
          expense_entry_uuid: createExpenseReceiptDto.expense_entry_uuid,
          store_uuid: createExpenseReceiptDto.store_uuid,
          receipt_date: createExpenseReceiptDto.receipt_date ? new Date(createExpenseReceiptDto.receipt_date) : new Date(),
          total_amount: createExpenseReceiptDto.total_amount,
        },
        include: {
          store: true,
          expense_entry: true,
          items: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create expense receipt');
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.expenseReceipt.findMany({
        where: { user_uuid },
        orderBy: { receipt_date: 'desc' },
        include: {
          store: true,
          expense_entry: true,
          items: {
            include: {
              category: true,
              subcategory: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense receipts');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const receipt = await this.prisma.expenseReceipt.findFirst({
        where: { uuid, user_uuid },
        include: {
          store: true,
          expense_entry: true,
          items: {
            include: {
              category: true,
              subcategory: true,
            },
          },
        },
      });

      if (!receipt) {
        throw new NotFoundException('Expense receipt not found');
      }

      return receipt;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch expense receipt');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseReceiptDto: UpdateExpenseReceiptDto) {
    try {
      await this.findOne(user_uuid, uuid);

      if (Object.keys(updateExpenseReceiptDto).length > 0) {
        await this.validateRelations(user_uuid, updateExpenseReceiptDto);
      }

      return await this.prisma.expenseReceipt.update({
        where: { uuid },
        data: {
          store_uuid: updateExpenseReceiptDto.store_uuid,
          receipt_date: updateExpenseReceiptDto.receipt_date ? new Date(updateExpenseReceiptDto.receipt_date) : undefined,
          total_amount: updateExpenseReceiptDto.total_amount,
        },
        include: {
          store: true,
          expense_entry: true,
          items: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update expense receipt');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseReceipt.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete expense receipt');
    }
  }

  private async validateRelations(user_uuid: string, dto: Partial<CreateExpenseReceiptDto>): Promise<void> {
    if (dto.expense_entry_uuid) {
      const entry = await this.prisma.expenseEntry.findFirst({
        where: { uuid: dto.expense_entry_uuid, user_uuid },
      });

      if (!entry) {
        throw new BadRequestException('Expense entry not found or does not belong to user');
      }
    }

    if (dto.store_uuid) {
      const store = await this.prisma.expenseStore.findFirst({
        where: {
          uuid: dto.store_uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
      });

      if (!store) {
        throw new BadRequestException('Expense store not found or does not belong to user');
      }
    }
  }
}
