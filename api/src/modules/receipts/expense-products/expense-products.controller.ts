import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ExpenseProductsService } from './expense-products.service';
import { CreateExpenseProductDto } from './dto/create-expense-product.dto';
import { UpdateExpenseProductDto } from './dto/update-expense-product.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ProductSource } from '@/generated/prisma';

@ApiTags('Expense Products')
@ApiBearerAuth()
@Controller('expense-products')
@UseGuards(JwtGuard)
export class ExpenseProductsController {
  constructor(private readonly expenseProductsService: ExpenseProductsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense product' })
  @ApiResponse({ status: 201, description: 'Expense product created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseProductDto: CreateExpenseProductDto
  ) {
    return this.expenseProductsService.create(user_uuid, createExpenseProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense products for the current user' })
  @ApiQuery({ name: 'source', enum: ProductSource, required: false, description: 'Filter by which feature the product belongs to' })
  @ApiResponse({ status: 200, description: 'Expense products retrieved successfully' })
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query('source') source?: string,
  ) {
    if (source && !Object.values(ProductSource).includes(source as ProductSource)) {
      throw new BadRequestException('Invalid source');
    }

    return this.expenseProductsService.findAll(user_uuid, source as ProductSource | undefined);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense product by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense product UUID' })
  @ApiResponse({ status: 200, description: 'Expense product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense product not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseProductsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense product' })
  @ApiParam({ name: 'uuid', description: 'Expense product UUID' })
  @ApiResponse({ status: 200, description: 'Expense product updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense product not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseProductDto: UpdateExpenseProductDto
  ) {
    return this.expenseProductsService.update(user_uuid, uuid, updateExpenseProductDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense product' })
  @ApiParam({ name: 'uuid', description: 'Expense product UUID' })
  @ApiResponse({ status: 200, description: 'Expense product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense product not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseProductsService.remove(user_uuid, uuid);
  }
}
