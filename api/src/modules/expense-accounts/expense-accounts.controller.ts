import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ExpenseAccountsService } from './expense-accounts.service';
import { CreateExpenseAccountDto } from './dto/create-expense-account.dto';
import { UpdateExpenseAccountDto } from './dto/update-expense-account.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('expense-accounts')
@UseGuards(JwtGuard)
export class ExpenseAccountsController {
  constructor(private readonly expenseAccountsService: ExpenseAccountsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseAccountDto: CreateExpenseAccountDto
  ) {
    return this.expenseAccountsService.create(user_uuid, createExpenseAccountDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseAccountsService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseAccountsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseAccountDto: UpdateExpenseAccountDto
  ) {
    return this.expenseAccountsService.update(user_uuid, uuid, updateExpenseAccountDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseAccountsService.remove(user_uuid, uuid);
  }
}
