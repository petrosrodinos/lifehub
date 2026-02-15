import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateExpenseAccountDto } from './dto/create-expense-account.dto';
import { UpdateExpenseAccountDto } from './dto/update-expense-account.dto';
import { PrismaService } from '../../core/databases/prisma/prisma.service';

@Injectable()
export class ExpenseAccountsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createExpenseAccountDto: CreateExpenseAccountDto) {

    try {
      return await this.prisma.expenseAccount.create({
        data: {
          user_uuid,
          name: createExpenseAccountDto.name,
          balance: createExpenseAccountDto.balance ?? 0,
          icon: createExpenseAccountDto.icon,
          color: createExpenseAccountDto.color,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create expense account');
    }
  }

  async findAll(user_uuid: string) {

    try {
      return await this.prisma.expenseAccount.findMany({
        where: { user_uuid },
        orderBy: { created_at: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to get all expense accounts');
    }
  }

  async findOne(user_uuid: string, uuid: string) {

    try {
      const account = await this.prisma.expenseAccount.findFirst({
        where: { uuid, user_uuid },
      });

      if (!account) {
        throw new NotFoundException('Expense account not found');
      }

      return account;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get expense account');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseAccountDto: UpdateExpenseAccountDto) {

    try {
      await this.findOne(user_uuid, uuid);

      return this.prisma.expenseAccount.update({
        where: { uuid },
        data: updateExpenseAccountDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update expense account');
    }
  }

  async remove(user_uuid: string, uuid: string) {

    try {
      await this.findOne(user_uuid, uuid);

      return this.prisma.expenseAccount.delete({
        where: { uuid },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove expense account');
    }
  }
}
