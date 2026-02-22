import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseStoreService } from './expense-store.service';
import { CreateExpenseStoreDto } from './dto/create-expense-store.dto';
import { UpdateExpenseStoreDto } from './dto/update-expense-store.dto';

@Controller('expense-store')
export class ExpenseStoreController {
  constructor(private readonly expenseStoreService: ExpenseStoreService) {}

  @Post()
  create(@Body() createExpenseStoreDto: CreateExpenseStoreDto) {
    return this.expenseStoreService.create(createExpenseStoreDto);
  }

  @Get()
  findAll() {
    return this.expenseStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseStoreDto: UpdateExpenseStoreDto) {
    return this.expenseStoreService.update(+id, updateExpenseStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseStoreService.remove(+id);
  }
}
