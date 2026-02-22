import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseAccountsService } from './expense-accounts.service';
import { CreateExpenseAccountDto } from './dto/create-expense-account.dto';
import { UpdateExpenseAccountDto } from './dto/update-expense-account.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Expense Accounts')
@ApiBearerAuth()
@Controller('expense-accounts')
@UseGuards(JwtGuard)
export class ExpenseAccountsController {
  constructor(private readonly expenseAccountsService: ExpenseAccountsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense account' })
  @ApiResponse({ status: 201, description: 'Expense account created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseAccountDto: CreateExpenseAccountDto
  ) {
    return this.expenseAccountsService.create(user_uuid, createExpenseAccountDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense accounts for the current user' })
  @ApiResponse({ status: 200, description: 'Expense accounts retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseAccountsService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense account by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense account UUID' })
  @ApiResponse({ status: 200, description: 'Expense account retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense account not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseAccountsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense account' })
  @ApiParam({ name: 'uuid', description: 'Expense account UUID' })
  @ApiResponse({ status: 200, description: 'Expense account updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense account not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseAccountDto: UpdateExpenseAccountDto
  ) {
    return this.expenseAccountsService.update(user_uuid, uuid, updateExpenseAccountDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense account' })
  @ApiParam({ name: 'uuid', description: 'Expense account UUID' })
  @ApiResponse({ status: 200, description: 'Expense account deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense account not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseAccountsService.remove(user_uuid, uuid);
  }
}
