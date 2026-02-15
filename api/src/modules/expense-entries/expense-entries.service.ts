import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { UpdateExpenseEntryDto } from './dto/update-expense-entry.dto';
import { PrismaService } from '../../core/databases/prisma/prisma.service';
import { ExpenseEntryType } from '@/generated/prisma';
import { ExpenseEntriesQueryType } from './schemas/expense-entries-query.schema';


@Injectable()
export class ExpenseEntriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseEntryDto: CreateExpenseEntryDto) {
    try {
      await this.validateRelations(user_uuid, createExpenseEntryDto);

      const entry = await this.prisma.expenseEntry.create({
        data: {
          user_uuid,
          type: createExpenseEntryDto.type,
          amount: createExpenseEntryDto.amount,
          description: createExpenseEntryDto.description,
          from_account_uuid: createExpenseEntryDto.from_account_uuid,
          to_account_uuid: createExpenseEntryDto.to_account_uuid,
          category_uuid: createExpenseEntryDto.category_uuid,
          subcategory_uuid: createExpenseEntryDto.subcategory_uuid,
          entry_date: createExpenseEntryDto.entry_date ? new Date(createExpenseEntryDto.entry_date) : new Date(),
        }
      });

      await this.updateAccountBalances(createExpenseEntryDto);

      return entry;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create expense entry');
    }
  }

  async findAll(user_uuid: string, query: ExpenseEntriesQueryType) {
    try {
      const { page, limit, type, category_uuid, subcategory_uuid, from_account_uuid, to_account_uuid, from_date, to_date, search } = query;

      const skip = (page - 1) * limit;

      const where: any = { user_uuid };

      if (type) {
        where.type = type;
      }

      if (category_uuid) {
        where.category_uuid = category_uuid;
      }

      if (subcategory_uuid) {
        where.subcategory_uuid = subcategory_uuid;
      }

      if (from_account_uuid) {
        where.from_account_uuid = from_account_uuid;
      }

      if (to_account_uuid) {
        where.to_account_uuid = to_account_uuid;
      }

      if (from_date || to_date) {
        where.entry_date = {};

        if (from_date) {
          where.entry_date.gte = from_date;
        }

        if (to_date) {
          where.entry_date.lte = to_date;
        }
      }

      if (search) {
        where.description = {
          contains: search,
          mode: 'insensitive',
        };
      }

      const [data, total] = await Promise.all([
        this.prisma.expenseEntry.findMany({
          where,
          skip,
          take: limit,
          orderBy: { entry_date: 'desc' },
          include: {
            from_account: true,
            to_account: true,
            category: true,
            subcategory: true,
          },
        }),
        this.prisma.expenseEntry.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense entries');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const entry = await this.prisma.expenseEntry.findFirst({
        where: { uuid, user_uuid },
        include: {
          from_account: true,
          to_account: true,
          category: true,
          subcategory: true,
        },
      });

      if (!entry) {
        throw new NotFoundException('Expense entry not found');
      }

      return entry;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch expense entry');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseEntryDto: UpdateExpenseEntryDto) {
    try {
      const existingEntry = await this.findOne(user_uuid, uuid);

      if (Object.keys(updateExpenseEntryDto).length > 0) {
        await this.validateRelations(user_uuid, updateExpenseEntryDto);
      }

      await this.revertAccountBalances(existingEntry);

      const updatedEntry = await this.prisma.expenseEntry.update({
        where: { uuid },
        data: {
          ...updateExpenseEntryDto,
          entry_date: updateExpenseEntryDto.entry_date ? new Date(updateExpenseEntryDto.entry_date) : undefined,
        }
      });

      await this.updateAccountBalances({
        type: updatedEntry.type,
        amount: Number(updatedEntry.amount),
        from_account_uuid: updatedEntry.from_account_uuid,
        to_account_uuid: updatedEntry.to_account_uuid,
      });

      return updatedEntry;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update expense entry');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      const entry = await this.findOne(user_uuid, uuid);

      await this.revertAccountBalances(entry);

      return await this.prisma.expenseEntry.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete expense entry');
    }
  }

  private async validateRelations(user_uuid: string, dto: Partial<CreateExpenseEntryDto>) {
    if (dto.from_account_uuid) {
      const fromAccount = await this.prisma.expenseAccount.findFirst({
        where: { uuid: dto.from_account_uuid, user_uuid },
      });

      if (!fromAccount) {
        throw new BadRequestException('Source account not found or does not belong to user');
      }
    }

    if (dto.to_account_uuid) {
      const toAccount = await this.prisma.expenseAccount.findFirst({
        where: { uuid: dto.to_account_uuid, user_uuid },
      });

      if (!toAccount) {
        throw new BadRequestException('Destination account not found or does not belong to user');
      }
    }

    if (dto.category_uuid) {
      const category = await this.prisma.expenseCategory.findFirst({
        where: { uuid: dto.category_uuid, user_uuid },
      });

      if (!category) {
        throw new BadRequestException('Category not found or does not belong to user');
      }
    }

    if (dto.subcategory_uuid) {
      const subcategory = await this.prisma.expenseSubcategory.findFirst({
        where: { uuid: dto.subcategory_uuid, user_uuid },
      });

      if (!subcategory) {
        throw new BadRequestException('Subcategory not found or does not belong to user');
      }

      if (dto.category_uuid && subcategory.category_uuid !== dto.category_uuid) {
        throw new BadRequestException('Subcategory does not belong to the selected category');
      }
    }
  }

  private async updateAccountBalances(data: { type: ExpenseEntryType; amount: number; from_account_uuid: string; to_account_uuid?: string | null }) {
    if (data.type === ExpenseEntryType.EXPENSE) {
      await this.prisma.expenseAccount.update({
        where: { uuid: data.from_account_uuid },
        data: { balance: { decrement: data.amount } },
      });
    } else if (data.type === ExpenseEntryType.INCOME) {
      await this.prisma.expenseAccount.update({
        where: { uuid: data.from_account_uuid },
        data: { balance: { increment: data.amount } },
      });
    } else if (data.type === ExpenseEntryType.TRANSFER && data.to_account_uuid) {
      await this.prisma.expenseAccount.update({
        where: { uuid: data.from_account_uuid },
        data: { balance: { decrement: data.amount } },
      });

      await this.prisma.expenseAccount.update({
        where: { uuid: data.to_account_uuid },
        data: { balance: { increment: data.amount } },
      });
    }
  }

  private async revertAccountBalances(entry: any) {
    const amount = Number(entry.amount);

    if (entry.type === ExpenseEntryType.EXPENSE) {
      await this.prisma.expenseAccount.update({
        where: { uuid: entry.from_account_uuid },
        data: { balance: { increment: amount } },
      });
    } else if (entry.type === ExpenseEntryType.INCOME) {
      await this.prisma.expenseAccount.update({
        where: { uuid: entry.from_account_uuid },
        data: { balance: { decrement: amount } },
      });
    } else if (entry.type === ExpenseEntryType.TRANSFER && entry.to_account_uuid) {
      await this.prisma.expenseAccount.update({
        where: { uuid: entry.from_account_uuid },
        data: { balance: { increment: amount } },
      });

      await this.prisma.expenseAccount.update({
        where: { uuid: entry.to_account_uuid },
        data: { balance: { decrement: amount } },
      });
    }
  }
}
