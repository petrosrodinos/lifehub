import { Injectable } from '@nestjs/common';
import { CreateExpenseReceiptItemDto } from './dto/create-expense-receipt-item.dto';
import { UpdateExpenseReceiptItemDto } from './dto/update-expense-receipt-item.dto';

@Injectable()
export class ExpenseReceiptItemService {
  create(createExpenseReceiptItemDto: CreateExpenseReceiptItemDto) {
    return 'This action adds a new expenseReceiptItem';
  }

  findAll() {
    return `This action returns all expenseReceiptItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseReceiptItem`;
  }

  update(id: number, updateExpenseReceiptItemDto: UpdateExpenseReceiptItemDto) {
    return `This action updates a #${id} expenseReceiptItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseReceiptItem`;
  }
}
