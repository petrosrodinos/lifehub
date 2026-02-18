import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ExpenseSubcategoriesService } from './expense-subcategories.service';
import { CreateExpenseSubcategoryDto } from './dto/create-expense-subcategory.dto';
import { UpdateExpenseSubcategoryDto } from './dto/update-expense-subcategory.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('expense-subcategories')
@UseGuards(JwtGuard)
export class ExpenseSubcategoriesController {
  constructor(private readonly expenseSubcategoriesService: ExpenseSubcategoriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseSubcategoryDto: CreateExpenseSubcategoryDto
  ) {
    return this.expenseSubcategoriesService.create(user_uuid, createExpenseSubcategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseSubcategoriesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseSubcategoriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseSubcategoryDto: UpdateExpenseSubcategoryDto
  ) {
    return this.expenseSubcategoriesService.update(user_uuid, uuid, updateExpenseSubcategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseSubcategoriesService.remove(user_uuid, uuid);
  }
}
