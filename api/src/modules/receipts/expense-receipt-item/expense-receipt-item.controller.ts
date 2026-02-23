import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseReceiptItemService } from './expense-receipt-item.service';
import { CreateExpenseReceiptItemDto } from './dto/create-expense-receipt-item.dto';
import { UpdateExpenseReceiptItemDto } from './dto/update-expense-receipt-item.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { PriceEvolutionQuerySchema, type PriceEvolutionQueryType } from './schemas/price-evolution-query.schema';

@ApiTags('Expense Receipt Items')
@ApiBearerAuth()
@Controller('expense-receipt-items')
@UseGuards(JwtGuard)
export class ExpenseReceiptItemController {
  constructor(private readonly expenseReceiptItemService: ExpenseReceiptItemService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense receipt item' })
  @ApiResponse({ status: 201, description: 'Expense receipt item created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseReceiptItemDto: CreateExpenseReceiptItemDto
  ) {
    return this.expenseReceiptItemService.create(user_uuid, createExpenseReceiptItemDto);
  }

  @Get('analytics/price-evolution')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get price evolution data for a specific product' })
  @ApiResponse({ status: 200, description: 'Price evolution data retrieved successfully' })
  priceEvolution(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(PriceEvolutionQuerySchema)) query: PriceEvolutionQueryType,
  ) {
    return this.expenseReceiptItemService.priceEvolution(user_uuid, query);
  }

  @Get('receipt/:receipt_uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all items for a specific receipt' })
  @ApiParam({ name: 'receipt_uuid', description: 'Receipt UUID' })
  @ApiResponse({ status: 200, description: 'Expense receipt items retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Receipt not found' })
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('receipt_uuid') receipt_uuid: string
  ) {
    return this.expenseReceiptItemService.findAll(user_uuid, receipt_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense receipt item by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense receipt item UUID' })
  @ApiResponse({ status: 200, description: 'Expense receipt item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense receipt item not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseReceiptItemService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense receipt item' })
  @ApiParam({ name: 'uuid', description: 'Expense receipt item UUID' })
  @ApiResponse({ status: 200, description: 'Expense receipt item updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense receipt item not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseReceiptItemDto: UpdateExpenseReceiptItemDto
  ) {
    return this.expenseReceiptItemService.update(user_uuid, uuid, updateExpenseReceiptItemDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense receipt item' })
  @ApiParam({ name: 'uuid', description: 'Expense receipt item UUID' })
  @ApiResponse({ status: 200, description: 'Expense receipt item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense receipt item not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseReceiptItemService.remove(user_uuid, uuid);
  }
}
