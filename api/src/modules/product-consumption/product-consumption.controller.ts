import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProductConsumptionService } from './product-consumption.service';
import { CreateProductPurchaseDto } from './dto/create-product-purchase.dto';
import { UpdateProductPurchaseDto } from './dto/update-product-purchase.dto';
import { CreateFromExpenseDto } from './dto/create-from-expense.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { ProductPurchasesQuerySchema, ProductPurchasesQueryType } from './schemas/product-purchases-query.schema';
import { DashboardQuerySchema, DashboardQueryType } from './schemas/dashboard-query.schema';
import { ProductAnalyticsQuerySchema, ProductAnalyticsQueryType } from './schemas/product-analytics-query.schema';
import { ComparisonQuerySchema, ComparisonQueryType } from './schemas/comparison-query.schema';

@ApiTags('Product Purchases')
@ApiBearerAuth()
@Controller('product-purchases')
@UseGuards(JwtGuard)
export class ProductConsumptionController {
  constructor(private readonly productConsumptionService: ProductConsumptionService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a product purchase / consumption cycle' })
  @ApiResponse({ status: 201, description: 'Product purchase created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createProductPurchaseDto: CreateProductPurchaseDto,
  ) {
    return this.productConsumptionService.create(user_uuid, createProductPurchaseDto);
  }

  @Post('from-expense/:expense_entry_uuid')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Track product usage from an existing expense entry' })
  @ApiParam({ name: 'expense_entry_uuid', description: 'Expense entry UUID' })
  @ApiResponse({ status: 201, description: 'Product purchase created from expense successfully' })
  createFromExpense(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('expense_entry_uuid') expense_entry_uuid: string,
    @Body() createFromExpenseDto: CreateFromExpenseDto,
  ) {
    return this.productConsumptionService.createFromExpense(user_uuid, expense_entry_uuid, createFromExpenseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all product purchases with optional filters' })
  @ApiResponse({ status: 200, description: 'Product purchases retrieved successfully' })
  findAll(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ProductPurchasesQuerySchema)) query: ProductPurchasesQueryType,
  ) {
    return this.productConsumptionService.findAll(user_uuid, query);
  }

  @Get('dashboard/summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get consumption dashboard summary' })
  @ApiResponse({ status: 200, description: 'Dashboard summary retrieved successfully' })
  getDashboardSummary(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(DashboardQuerySchema)) query: DashboardQueryType,
  ) {
    return this.productConsumptionService.getDashboardSummary(user_uuid, query);
  }

  @Get('products/:product_uuid/summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get purchase history and lifetime stats for a single product' })
  @ApiParam({ name: 'product_uuid', description: 'Product UUID' })
  @ApiResponse({ status: 200, description: 'Product summary retrieved successfully' })
  getProductSummary(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('product_uuid') product_uuid: string,
  ) {
    return this.productConsumptionService.getProductSummary(user_uuid, product_uuid);
  }

  @Get('analytics/most-expensive-per-day')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rank products by average cost per day' })
  @ApiResponse({ status: 200, description: 'Ranking retrieved successfully' })
  getMostExpensivePerDay(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ProductAnalyticsQuerySchema)) query: ProductAnalyticsQueryType,
  ) {
    return this.productConsumptionService.getMostExpensivePerDay(user_uuid, query);
  }

  @Get('analytics/most-expensive-per-month')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rank products by average cost per month' })
  @ApiResponse({ status: 200, description: 'Ranking retrieved successfully' })
  getMostExpensivePerMonth(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ProductAnalyticsQuerySchema)) query: ProductAnalyticsQueryType,
  ) {
    return this.productConsumptionService.getMostExpensivePerMonth(user_uuid, query);
  }

  @Get('analytics/longest-lasting')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rank products by average lifespan, longest first' })
  @ApiResponse({ status: 200, description: 'Ranking retrieved successfully' })
  getLongestLasting(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ProductAnalyticsQuerySchema)) query: ProductAnalyticsQueryType,
  ) {
    return this.productConsumptionService.getLongestLasting(user_uuid, query);
  }

  @Get('analytics/fastest-consumed')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rank products by average lifespan, shortest first' })
  @ApiResponse({ status: 200, description: 'Ranking retrieved successfully' })
  getFastestConsumed(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ProductAnalyticsQuerySchema)) query: ProductAnalyticsQueryType,
  ) {
    return this.productConsumptionService.getFastestConsumed(user_uuid, query);
  }

  @Get('analytics/most-frequently-purchased')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rank products by shortest repurchase interval' })
  @ApiResponse({ status: 200, description: 'Ranking retrieved successfully' })
  getMostFrequentlyPurchased(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ProductAnalyticsQuerySchema)) query: ProductAnalyticsQueryType,
  ) {
    return this.productConsumptionService.getMostFrequentlyPurchased(user_uuid, query);
  }

  @Get('analytics/category-consumption-cost')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get consumption cost grouped by product category' })
  @ApiResponse({ status: 200, description: 'Category consumption cost retrieved successfully' })
  getCategoryConsumptionCost(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ProductAnalyticsQuerySchema)) query: ProductAnalyticsQueryType,
  ) {
    return this.productConsumptionService.getCategoryConsumptionCost(user_uuid, query);
  }

  @Get('analytics/compare')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Compare consumption economics across two or more products' })
  @ApiResponse({ status: 200, description: 'Comparison retrieved successfully' })
  compareProducts(
    @CurrentUser('user_uuid') user_uuid: string,
    @Query(new ZodValidationPipe(ComparisonQuerySchema)) query: ComparisonQueryType,
  ) {
    return this.productConsumptionService.compareProducts(user_uuid, query);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific product purchase by UUID' })
  @ApiParam({ name: 'uuid', description: 'Product purchase UUID' })
  @ApiResponse({ status: 200, description: 'Product purchase retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product purchase not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.productConsumptionService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a product purchase' })
  @ApiParam({ name: 'uuid', description: 'Product purchase UUID' })
  @ApiResponse({ status: 200, description: 'Product purchase updated successfully' })
  @ApiResponse({ status: 404, description: 'Product purchase not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateProductPurchaseDto: UpdateProductPurchaseDto,
  ) {
    return this.productConsumptionService.update(user_uuid, uuid, updateProductPurchaseDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a product purchase' })
  @ApiParam({ name: 'uuid', description: 'Product purchase UUID' })
  @ApiResponse({ status: 200, description: 'Product purchase deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product purchase not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.productConsumptionService.remove(user_uuid, uuid);
  }
}
