import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ExpenseEntriesService } from './expense-entries.service';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { UpdateExpenseEntryDto } from './dto/update-expense-entry.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { ExpenseEntriesQuerySchema, ExpenseEntriesQueryType } from './schemas/expense-entries-query.schema';
import { AnalyticsQuerySchema, AnalyticsQueryType } from './schemas/analytics-query.schema';
import { CategoryAnalyticsQuerySchema, CategoryAnalyticsQueryType, TransactionTrendQuerySchema, TransactionTrendQueryType } from './schemas/category-analytics-query.schema';

@ApiTags('Expense Entries')
@ApiBearerAuth()
@Controller('expense-entries')
@UseGuards(JwtGuard)
export class ExpenseEntriesController {
  constructor(private readonly expenseEntriesService: ExpenseEntriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense entry' })
  @ApiResponse({ status: 201, description: 'Expense entry created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseEntryDto: CreateExpenseEntryDto
  ) {
    return this.expenseEntriesService.create(user_uuid, createExpenseEntryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense entries with optional filters' })
  @ApiResponse({ status: 200, description: 'Expense entries retrieved successfully' })
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ExpenseEntriesQuerySchema)) query: ExpenseEntriesQueryType
  ) {
    return this.expenseEntriesService.findAll(user_uuid, query);
  }

  @Get('analytics/balance-trend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get balance trend analytics' })
  @ApiResponse({ status: 200, description: 'Balance trend data retrieved successfully' })
  getBalanceTrend(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(AnalyticsQuerySchema)) query: AnalyticsQueryType
  ) {
    return this.expenseEntriesService.getBalanceTrend(user_uuid, query);
  }

  @Get('analytics/income-expense')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get income vs expense analytics' })
  @ApiResponse({ status: 200, description: 'Income vs expense data retrieved successfully' })
  getIncomeExpense(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(AnalyticsQuerySchema)) query: AnalyticsQueryType
  ) {
    return this.expenseEntriesService.getIncomeExpense(user_uuid, query);
  }

  @Get('analytics/stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get expense statistics summary' })
  @ApiResponse({ status: 200, description: 'Expense statistics retrieved successfully' })
  getStats(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(AnalyticsQuerySchema)) query: AnalyticsQueryType
  ) {
    return this.expenseEntriesService.getStats(user_uuid, query);
  }

  @Get('analytics/expenses-by-subcategory')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get expenses grouped by subcategory' })
  @ApiResponse({ status: 200, description: 'Expenses by subcategory retrieved successfully' })
  getExpensesBySubcategory(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(CategoryAnalyticsQuerySchema)) query: CategoryAnalyticsQueryType
  ) {
    return this.expenseEntriesService.getExpensesBySubcategory(user_uuid, query);
  }

  @Get('analytics/transaction-trend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get transaction trend over time' })
  @ApiResponse({ status: 200, description: 'Transaction trend data retrieved successfully' })
  getTransactionTrend(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(TransactionTrendQuerySchema)) query: TransactionTrendQueryType
  ) {
    return this.expenseEntriesService.getTransactionTrend(user_uuid, query);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense entry by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense entry UUID' })
  @ApiResponse({ status: 200, description: 'Expense entry retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense entry not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseEntriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense entry' })
  @ApiParam({ name: 'uuid', description: 'Expense entry UUID' })
  @ApiResponse({ status: 200, description: 'Expense entry updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense entry not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseEntryDto: UpdateExpenseEntryDto
  ) {
    return this.expenseEntriesService.update(user_uuid, uuid, updateExpenseEntryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense entry' })
  @ApiParam({ name: 'uuid', description: 'Expense entry UUID' })
  @ApiResponse({ status: 200, description: 'Expense entry deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense entry not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseEntriesService.remove(user_uuid, uuid);
  }
}
