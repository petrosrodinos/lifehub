import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseStoreService } from './expense-store.service';
import { CreateExpenseStoreDto } from './dto/create-expense-store.dto';
import { UpdateExpenseStoreDto } from './dto/update-expense-store.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Expense Stores')
@ApiBearerAuth()
@Controller('expense-stores')
@UseGuards(JwtGuard)
export class ExpenseStoreController {
  constructor(private readonly expenseStoreService: ExpenseStoreService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense store' })
  @ApiResponse({ status: 201, description: 'Expense store created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseStoreDto: CreateExpenseStoreDto
  ) {
    return this.expenseStoreService.create(user_uuid, createExpenseStoreDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense stores for the current user' })
  @ApiResponse({ status: 200, description: 'Expense stores retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseStoreService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense store by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense store UUID' })
  @ApiResponse({ status: 200, description: 'Expense store retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense store not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseStoreService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense store' })
  @ApiParam({ name: 'uuid', description: 'Expense store UUID' })
  @ApiResponse({ status: 200, description: 'Expense store updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense store not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseStoreDto: UpdateExpenseStoreDto
  ) {
    return this.expenseStoreService.update(user_uuid, uuid, updateExpenseStoreDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense store' })
  @ApiParam({ name: 'uuid', description: 'Expense store UUID' })
  @ApiResponse({ status: 200, description: 'Expense store deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense store not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseStoreService.remove(user_uuid, uuid);
  }
}
