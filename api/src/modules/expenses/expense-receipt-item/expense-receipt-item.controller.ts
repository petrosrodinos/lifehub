import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseReceiptItemService } from './expense-receipt-item.service';
import { CreateExpenseReceiptItemDto } from './dto/create-expense-receipt-item.dto';
import { UpdateExpenseReceiptItemDto } from './dto/update-expense-receipt-item.dto';

@Controller('expense-receipt-item')
export class ExpenseReceiptItemController {
  constructor(private readonly expenseReceiptItemService: ExpenseReceiptItemService) {}

  @Post()
  create(@Body() createExpenseReceiptItemDto: CreateExpenseReceiptItemDto) {
    return this.expenseReceiptItemService.create(createExpenseReceiptItemDto);
  }

  @Get()
  findAll() {
    return this.expenseReceiptItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseReceiptItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseReceiptItemDto: UpdateExpenseReceiptItemDto) {
    return this.expenseReceiptItemService.update(+id, updateExpenseReceiptItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseReceiptItemService.remove(+id);
  }
}
