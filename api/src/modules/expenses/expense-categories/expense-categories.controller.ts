import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseCategoriesService } from './expense-categories.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { AuthRoles } from '@/modules/auth/interfaces/auth.interface';

@ApiTags('Expense Categories')
@ApiBearerAuth()
@Controller('expense-categories')
@UseGuards(JwtGuard)
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) { }

  @Post('seed')
  @UseGuards(RolesGuard)
  @Roles(AuthRoles.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Seed default expense categories and subcategories (Admin only)' })
  @ApiResponse({ status: 201, description: 'Default categories seeded successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  seedDefaults(): Promise<{ categoriesCreated: number; subcategoriesCreated: number }> {
    return this.expenseCategoriesService.seedDefaults();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense category' })
  @ApiResponse({ status: 201, description: 'Expense category created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto
  ) {
    return this.expenseCategoriesService.create(user_uuid, createExpenseCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense categories for the current user' })
  @ApiResponse({ status: 200, description: 'Expense categories retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseCategoriesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific expense category by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense category UUID' })
  @ApiResponse({ status: 200, description: 'Expense category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense category not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseCategoriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense category' })
  @ApiParam({ name: 'uuid', description: 'Expense category UUID' })
  @ApiResponse({ status: 200, description: 'Expense category updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense category not found' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto
  ) {
    return this.expenseCategoriesService.update(user_uuid, uuid, updateExpenseCategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense category' })
  @ApiParam({ name: 'uuid', description: 'Expense category UUID' })
  @ApiResponse({ status: 200, description: 'Expense category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense category not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseCategoriesService.remove(user_uuid, uuid);
  }
}
