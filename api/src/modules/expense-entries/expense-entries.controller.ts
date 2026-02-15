import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ExpenseEntriesService } from './expense-entries.service';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { UpdateExpenseEntryDto } from './dto/update-expense-entry.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { ExpenseEntriesQuerySchema, ExpenseEntriesQueryType } from './schemas/expense-entries-query.schema';
import { AnalyticsQuerySchema, AnalyticsQueryType } from './schemas/analytics-query.schema';
import { CategoryAnalyticsQuerySchema, CategoryAnalyticsQueryType, TransactionTrendQuerySchema, TransactionTrendQueryType } from './schemas/category-analytics-query.schema';

@Controller('expense-entries')
@UseGuards(JwtGuard)
export class ExpenseEntriesController {
  constructor(private readonly expenseEntriesService: ExpenseEntriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseEntryDto: CreateExpenseEntryDto
  ) {
    return this.expenseEntriesService.create(user_uuid, createExpenseEntryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ExpenseEntriesQuerySchema)) query: ExpenseEntriesQueryType
  ) {
    return this.expenseEntriesService.findAll(user_uuid, query);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseEntriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseEntryDto: UpdateExpenseEntryDto
  ) {
    return this.expenseEntriesService.update(user_uuid, uuid, updateExpenseEntryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseEntriesService.remove(user_uuid, uuid);
  }

  @Get('analytics/balance-trend')
  @HttpCode(HttpStatus.OK)
  getBalanceTrend(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(AnalyticsQuerySchema)) query: AnalyticsQueryType
  ) {
    return this.expenseEntriesService.getBalanceTrend(user_uuid, query);
  }

  @Get('analytics/income-expense')
  @HttpCode(HttpStatus.OK)
  getIncomeExpense(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(AnalyticsQuerySchema)) query: AnalyticsQueryType
  ) {
    return this.expenseEntriesService.getIncomeExpense(user_uuid, query);
  }

  @Get('analytics/stats')
  @HttpCode(HttpStatus.OK)
  getStats(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(AnalyticsQuerySchema)) query: AnalyticsQueryType
  ) {
    return this.expenseEntriesService.getStats(user_uuid, query);
  }

  @Get('analytics/expenses-by-subcategory')
  @HttpCode(HttpStatus.OK)
  getExpensesBySubcategory(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(CategoryAnalyticsQuerySchema)) query: CategoryAnalyticsQueryType
  ) {
    return this.expenseEntriesService.getExpensesBySubcategory(user_uuid, query);
  }

  @Get('analytics/transaction-trend')
  @HttpCode(HttpStatus.OK)
  getTransactionTrend(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(TransactionTrendQuerySchema)) query: TransactionTrendQueryType
  ) {
    return this.expenseEntriesService.getTransactionTrend(user_uuid, query);
  }
}
