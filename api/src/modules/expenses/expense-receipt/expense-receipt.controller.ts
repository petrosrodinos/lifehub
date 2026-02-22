import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseReceiptService } from './expense-receipt.service';
import { CreateExpenseReceiptDto } from './dto/create-expense-receipt.dto';
import { UpdateExpenseReceiptDto } from './dto/update-expense-receipt.dto';

@Controller('expense-receipt')
export class ExpenseReceiptController {
  constructor(private readonly expenseReceiptService: ExpenseReceiptService) {}

  @Post()
  create(@Body() createExpenseReceiptDto: CreateExpenseReceiptDto) {
    return this.expenseReceiptService.create(createExpenseReceiptDto);
  }

  @Get()
  findAll() {
    return this.expenseReceiptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseReceiptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseReceiptDto: UpdateExpenseReceiptDto) {
    return this.expenseReceiptService.update(+id, updateExpenseReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseReceiptService.remove(+id);
  }
}
