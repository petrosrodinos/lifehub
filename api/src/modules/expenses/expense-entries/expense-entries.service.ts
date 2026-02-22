import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { UpdateExpenseEntryDto } from './dto/update-expense-entry.dto';
import { PrismaService } from '../../../core/databases/prisma/prisma.service';
import { ExpenseEntryType } from '@/generated/prisma';
import { ExpenseEntriesQueryType } from './schemas/expense-entries-query.schema';
import { AnalyticsQueryType } from './schemas/analytics-query.schema';
import { CategoryAnalyticsQueryType, TransactionTrendQueryType } from './schemas/category-analytics-query.schema';


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
        where: { uuid: dto.category_uuid, OR: [{ user_uuid }, { user_uuid: null }] },
      });

      if (!category) {
        throw new BadRequestException('Category not found or does not belong to user');
      }
    }

    if (dto.subcategory_uuid) {
      const subcategory = await this.prisma.expenseSubcategory.findFirst({
        where: { uuid: dto.subcategory_uuid, OR: [{ user_uuid }, { user_uuid: null }] },
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

  async getBalanceTrend(user_uuid: string, query: AnalyticsQueryType) {
    try {
      const accountUuids = query.account_uuids ? query.account_uuids.split(',') : [];

      const accountWhere: Record<string, unknown> = { user_uuid };

      if (accountUuids.length > 0) {
        accountWhere.uuid = { in: accountUuids };
      }

      const accountBalances = await this.prisma.expenseAccount.aggregate({
        where: accountWhere,
        _sum: { balance: true },
      });

      const currentTotalBalance = Number(accountBalances._sum.balance || 0);

      const entryWhere: Record<string, unknown> = {
        user_uuid,
        type: { in: [ExpenseEntryType.INCOME, ExpenseEntryType.EXPENSE] },
      };

      if (accountUuids.length > 0) {
        entryWhere.from_account_uuid = { in: accountUuids };
      }

      if (query.from_date || query.to_date) {
        const dateFilter: Record<string, Date> = {};

        if (query.from_date) {
          dateFilter.gte = query.from_date;
        }

        if (query.to_date) {
          dateFilter.lte = query.to_date;
        }

        entryWhere.entry_date = dateFilter;
      }

      const entries = await this.prisma.expenseEntry.findMany({
        where: entryWhere,
        orderBy: { entry_date: 'asc' },
        select: {
          entry_date: true,
          amount: true,
          type: true,
        },
      });

      const fromDateEntriesWhere: Record<string, unknown> = {
        user_uuid,
        type: { in: [ExpenseEntryType.INCOME, ExpenseEntryType.EXPENSE] },
      };

      if (accountUuids.length > 0) {
        fromDateEntriesWhere.from_account_uuid = { in: accountUuids };
      }

      if (query.from_date) {
        fromDateEntriesWhere.entry_date = { gte: query.from_date };
      }

      const entriesFromDateOnward = await this.prisma.expenseEntry.findMany({
        where: fromDateEntriesWhere,
        select: {
          amount: true,
          type: true,
        },
      });

      let netFromDateOnward = 0;

      entriesFromDateOnward.forEach((entry) => {
        const amount = Number(entry.amount);

        if (entry.type === ExpenseEntryType.INCOME) {
          netFromDateOnward += amount;
        } else if (entry.type === ExpenseEntryType.EXPENSE) {
          netFromDateOnward -= amount;
        }
      });

      const startingBalance = currentTotalBalance - netFromDateOnward;

      const dateMap = new Map<string, number>();

      entries.forEach((entry) => {
        const date = entry.entry_date.toISOString().split('T')[0];
        const amount = Number(entry.amount);

        if (!dateMap.has(date)) {
          dateMap.set(date, 0);
        }

        if (entry.type === ExpenseEntryType.INCOME) {
          dateMap.set(date, dateMap.get(date)! + amount);
        } else if (entry.type === ExpenseEntryType.EXPENSE) {
          dateMap.set(date, dateMap.get(date)! - amount);
        }
      });

      const sortedDates = Array.from(dateMap.keys()).sort();
      let runningBalance = startingBalance;

      const data = sortedDates.map((date) => {
        runningBalance += dateMap.get(date)!;
        return {
          date,
          balance: runningBalance,
        };
      });

      return data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch balance trend');
    }
  }

  async getIncomeExpense(user_uuid: string, query: AnalyticsQueryType) {
    try {
      const accountUuids = query.account_uuids ? query.account_uuids.split(',') : [];

      const where: any = { user_uuid };

      if (accountUuids.length > 0) {
        where.from_account_uuid = { in: accountUuids };
      }

      if (query.from_date || query.to_date) {
        where.entry_date = {};

        if (query.from_date) {
          where.entry_date.gte = query.from_date;
        }

        if (query.to_date) {
          where.entry_date.lte = query.to_date;
        }
      }

      where.type = { in: [ExpenseEntryType.INCOME, ExpenseEntryType.EXPENSE] };

      const entries = await this.prisma.expenseEntry.findMany({
        where,
        orderBy: { entry_date: 'asc' },
        select: {
          entry_date: true,
          amount: true,
          type: true,
        },
      });

      const dateMap = new Map<string, { income: number; expense: number }>();

      entries.forEach((entry) => {
        const date = entry.entry_date.toISOString().split('T')[0];
        const amount = Number(entry.amount);

        if (!dateMap.has(date)) {
          dateMap.set(date, { income: 0, expense: 0 });
        }

        const current = dateMap.get(date)!;
        if (entry.type === ExpenseEntryType.INCOME) {
          current.income += amount;
        } else if (entry.type === ExpenseEntryType.EXPENSE) {
          current.expense += amount;
        }
      });

      const data = Array.from(dateMap.entries())
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, values]) => ({
          date,
          income: values.income,
          expense: values.expense,
        }));

      return data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch income and expense data');
    }
  }

  async getStats(user_uuid: string, query: AnalyticsQueryType) {
    try {
      const accountUuids = query.account_uuids ? query.account_uuids.split(',') : [];

      const where: any = { user_uuid };

      if (accountUuids.length > 0) {
        where.from_account_uuid = { in: accountUuids };
      }

      if (query.from_date || query.to_date) {
        where.entry_date = {};

        if (query.from_date) {
          where.entry_date.gte = query.from_date;
        }

        if (query.to_date) {
          where.entry_date.lte = query.to_date;
        }
      }

      where.type = { in: [ExpenseEntryType.INCOME, ExpenseEntryType.EXPENSE] };

      const entries = await this.prisma.expenseEntry.findMany({
        where,
        select: {
          amount: true,
          type: true,
        },
      });

      let totalIncome = 0;
      let totalExpense = 0;

      entries.forEach((entry) => {
        const amount = Number(entry.amount);

        if (entry.type === ExpenseEntryType.INCOME) {
          totalIncome += amount;
        } else if (entry.type === ExpenseEntryType.EXPENSE) {
          totalExpense += amount;
        }
      });

      return {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch stats');
    }
  }

  async getExpensesBySubcategory(user_uuid: string, query: CategoryAnalyticsQueryType) {
    try {
      const where: any = {
        user_uuid,
        type: query.type || ExpenseEntryType.EXPENSE,
      };

      if (query.from_date || query.to_date) {
        where.entry_date = {};

        if (query.from_date) {
          where.entry_date.gte = query.from_date;
        }

        if (query.to_date) {
          where.entry_date.lte = query.to_date;
        }
      }

      const entries = await this.prisma.expenseEntry.findMany({
        where,
        include: {
          subcategory: {
            include: {
              category: true,
            },
          },
        },
      });

      if (query.group_by === 'category') {
        const categoryMap = new Map<string, { name: string; icon: string; color: string; total: number; count: number }>();

        entries.forEach((entry) => {
          if (entry.subcategory?.category) {
            const key = entry.subcategory.category.uuid;
            const amount = Number(entry.amount);

            if (!categoryMap.has(key)) {
              categoryMap.set(key, {
                name: entry.subcategory.category.name,
                icon: entry.subcategory.category.icon || '',
                color: entry.subcategory.category.color || '#8b5cf6',
                total: 0,
                count: 0,
              });
            }

            const current = categoryMap.get(key)!;
            current.total += amount;
            current.count += 1;
          }
        });

        const data = Array.from(categoryMap.entries())
          .map(([uuid, values]) => ({
            uuid,
            name: values.name,
            icon: values.icon,
            color: values.color,
            total: values.total,
            count: values.count,
          }))
          .sort((a, b) => b.total - a.total);

        const total = data.reduce((sum, item) => sum + item.total, 0);

        return data.map((item) => ({
          ...item,
          percentage: total > 0 ? (item.total / total) * 100 : 0,
        }));
      } else {
        const subcategoryMap = new Map<string, { name: string; categoryName: string; categoryColor: string; total: number; count: number }>();

        entries.forEach((entry) => {
          if (entry.subcategory) {
            const key = entry.subcategory.uuid;
            const amount = Number(entry.amount);

            if (!subcategoryMap.has(key)) {
              subcategoryMap.set(key, {
                name: entry.subcategory.name,
                categoryName: entry.subcategory.category?.name || '',
                categoryColor: entry.subcategory.category?.color || '#8b5cf6',
                total: 0,
                count: 0,
              });
            }

            const current = subcategoryMap.get(key)!;
            current.total += amount;
            current.count += 1;
          }
        });

        const data = Array.from(subcategoryMap.entries())
          .map(([uuid, values]) => ({
            uuid,
            name: values.name,
            categoryName: values.categoryName,
            color: values.categoryColor,
            total: values.total,
            count: values.count,
          }))
          .sort((a, b) => b.total - a.total);

        const total = data.reduce((sum, item) => sum + item.total, 0);

        return data.map((item) => ({
          ...item,
          percentage: total > 0 ? (item.total / total) * 100 : 0,
        }));
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch by subcategory');
    }
  }

  async getTransactionTrend(user_uuid: string, query: TransactionTrendQueryType) {
    try {
      const where: any = {
        user_uuid,
        type: query.type,
        category_uuid: query.category_uuid,
      };

      if (query.subcategory_uuid) {
        where.subcategory_uuid = query.subcategory_uuid;
      }

      if (query.from_date || query.to_date) {
        where.entry_date = {};

        if (query.from_date) {
          where.entry_date.gte = query.from_date;
        }

        if (query.to_date) {
          where.entry_date.lte = query.to_date;
        }
      }

      const entries = await this.prisma.expenseEntry.findMany({
        where,
        orderBy: { entry_date: 'asc' },
        select: {
          entry_date: true,
          amount: true,
        },
      });

      const dateMap = new Map<string, number>();

      entries.forEach((entry) => {
        const date = entry.entry_date.toISOString().split('T')[0];
        const amount = Number(entry.amount);

        if (!dateMap.has(date)) {
          dateMap.set(date, 0);
        }

        dateMap.set(date, dateMap.get(date)! + amount);
      });

      return Array.from(dateMap.entries())
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, total]) => ({
          date,
          total,
        }));
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch transaction trend');
    }
  }
}
