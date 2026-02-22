import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseReceiptService } from './expense-receipt.service';
import { CreateExpenseReceiptDto } from './dto/create-expense-receipt.dto';
import { UpdateExpenseReceiptDto } from './dto/update-expense-receipt.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Expense Receipts')
@ApiBearerAuth()
@Controller('expense-receipts')
@UseGuards(JwtGuard)
export class ExpenseReceiptController {
  constructor(private readonly expenseReceiptService: ExpenseReceiptService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense receipt' })
  @ApiResponse({ status: 201, description: 'Expense receipt created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseReceiptDto: CreateExpenseReceiptDto
  ) {
    return this.expenseReceiptService.create(user_uuid, createExpenseReceiptDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense receipts for the current user' })
  @ApiResponse({ status: 200, description: 'Expense receipts retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseReceiptService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense receipt by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense receipt UUID' })
  @ApiResponse({ status: 200, description: 'Expense receipt retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense receipt not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseReceiptService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense receipt' })
  @ApiParam({ name: 'uuid', description: 'Expense receipt UUID' })
  @ApiResponse({ status: 200, description: 'Expense receipt updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense receipt not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseReceiptDto: UpdateExpenseReceiptDto
  ) {
    return this.expenseReceiptService.update(user_uuid, uuid, updateExpenseReceiptDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense receipt' })
  @ApiParam({ name: 'uuid', description: 'Expense receipt UUID' })
  @ApiResponse({ status: 200, description: 'Expense receipt deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense receipt not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseReceiptService.remove(user_uuid, uuid);
  }
}
