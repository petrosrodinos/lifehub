import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense-categories.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('expense-categories')
@UseGuards(JwtGuard)
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto
  ) {
    return this.expenseCategoriesService.create(user_uuid, createExpenseCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseCategoriesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseCategoriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto
  ) {
    return this.expenseCategoriesService.update(user_uuid, uuid, updateExpenseCategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseCategoriesService.remove(user_uuid, uuid);
  }
}
