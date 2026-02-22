import { Injectable } from '@nestjs/common';
import { CreateExpenseStoreDto } from './dto/create-expense-store.dto';
import { UpdateExpenseStoreDto } from './dto/update-expense-store.dto';

@Injectable()
export class ExpenseStoreService {
  create(createExpenseStoreDto: CreateExpenseStoreDto) {
    return 'This action adds a new expenseStore';
  }

  findAll() {
    return `This action returns all expenseStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseStore`;
  }

  update(id: number, updateExpenseStoreDto: UpdateExpenseStoreDto) {
    return `This action updates a #${id} expenseStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseStore`;
  }
}
