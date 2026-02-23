import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateExpenseStoreDto } from './dto/create-expense-store.dto';
import { UpdateExpenseStoreDto } from './dto/update-expense-store.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseStoreService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseStoreDto: CreateExpenseStoreDto): Promise<ReturnType<typeof this.prisma.expenseStore.create>> {
    try {
      return await this.prisma.expenseStore.create({
        data: {
          user_uuid,
          name: createExpenseStoreDto.name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create expense store');
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.expenseStore.findMany({
        where: {
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
        orderBy: { created_at: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense stores');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const store = await this.prisma.expenseStore.findFirst({
        where: {
          uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
      });

      if (!store) {
        throw new NotFoundException('Expense store not found');
      }

      return store;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch expense store');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseStoreDto: UpdateExpenseStoreDto) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseStore.update({
        where: { uuid },
        data: updateExpenseStoreDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update expense store');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseStore.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete expense store');
    }
  }
}
