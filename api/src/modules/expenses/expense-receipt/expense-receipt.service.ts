import { Injectable } from '@nestjs/common';
import { CreateExpenseReceiptDto } from './dto/create-expense-receipt.dto';
import { UpdateExpenseReceiptDto } from './dto/update-expense-receipt.dto';

@Injectable()
export class ExpenseReceiptService {
  create(createExpenseReceiptDto: CreateExpenseReceiptDto) {
    return 'This action adds a new expenseReceipt';
  }

  findAll() {
    return `This action returns all expenseReceipt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseReceipt`;
  }

  update(id: number, updateExpenseReceiptDto: UpdateExpenseReceiptDto) {
    return `This action updates a #${id} expenseReceipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseReceipt`;
  }
}
