import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateExpenseTagDto } from './dto/create-expense-tag.dto';
import { UpdateExpenseTagDto } from './dto/update-expense-tag.dto';

@Injectable()
export class ExpenseTagsService {
  private readonly logger = new Logger(ExpenseTagsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(user_uuid: string, dto: CreateExpenseTagDto) {
    try {
      return await this.prisma.expenseTag.create({
        data: {
          user_uuid,
          title: dto.title,
          color: dto.color ?? '#8b5cf6',
        },
      });
    } catch (error) {
      this.logger.error(`Failed to create expense tag: ${error.message}`);
      throw new InternalServerErrorException('Failed to create expense tag');
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.expenseTag.findMany({
        where: { user_uuid },
        orderBy: { created_at: 'asc' },
      });
    } catch (error) {
      this.logger.error(`Failed to get expense tags: ${error.message}`);
      throw new InternalServerErrorException('Failed to get expense tags');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const tag = await this.prisma.expenseTag.findFirst({ where: { uuid, user_uuid } });

      if (!tag) {
        throw new NotFoundException('Expense tag not found');
      }

      return tag;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get expense tag');
    }
  }

  async update(user_uuid: string, uuid: string, dto: UpdateExpenseTagDto) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseTag.update({
        where: { uuid },
        data: {
          ...(dto.title !== undefined ? { title: dto.title } : {}),
          ...(dto.color !== undefined ? { color: dto.color } : {}),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update expense tag');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseTag.delete({ where: { uuid } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete expense tag');
    }
  }
}
