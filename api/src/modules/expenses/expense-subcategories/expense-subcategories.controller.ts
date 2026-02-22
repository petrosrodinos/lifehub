import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseSubcategoriesService } from './expense-subcategories.service';
import { CreateExpenseSubcategoryDto } from './dto/create-expense-subcategory.dto';
import { UpdateExpenseSubcategoryDto } from './dto/update-expense-subcategory.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Expense Subcategories')
@ApiBearerAuth()
@Controller('expense-subcategories')
@UseGuards(JwtGuard)
export class ExpenseSubcategoriesController {
  constructor(private readonly expenseSubcategoriesService: ExpenseSubcategoriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense subcategory' })
  @ApiResponse({ status: 201, description: 'Expense subcategory created successfully' })
  @ApiResponse({ status: 400, description: 'Category not found or does not belong to user' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseSubcategoryDto: CreateExpenseSubcategoryDto
  ) {
    return this.expenseSubcategoriesService.create(user_uuid, createExpenseSubcategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense subcategories for the current user' })
  @ApiResponse({ status: 200, description: 'Expense subcategories retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseSubcategoriesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense subcategory by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense subcategory UUID' })
  @ApiResponse({ status: 200, description: 'Expense subcategory retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense subcategory not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseSubcategoriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense subcategory' })
  @ApiParam({ name: 'uuid', description: 'Expense subcategory UUID' })
  @ApiResponse({ status: 200, description: 'Expense subcategory updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense subcategory not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseSubcategoryDto: UpdateExpenseSubcategoryDto
  ) {
    return this.expenseSubcategoriesService.update(user_uuid, uuid, updateExpenseSubcategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense subcategory' })
  @ApiParam({ name: 'uuid', description: 'Expense subcategory UUID' })
  @ApiResponse({ status: 200, description: 'Expense subcategory deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense subcategory not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseSubcategoriesService.remove(user_uuid, uuid);
  }
}
