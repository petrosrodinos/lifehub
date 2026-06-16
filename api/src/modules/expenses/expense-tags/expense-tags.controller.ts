import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseTagsService } from './expense-tags.service';
import { CreateExpenseTagDto } from './dto/create-expense-tag.dto';
import { UpdateExpenseTagDto } from './dto/update-expense-tag.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Expense Tags')
@ApiBearerAuth()
@Controller('expense-tags')
@UseGuards(JwtGuard)
export class ExpenseTagsController {
  constructor(private readonly expenseTagsService: ExpenseTagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense tag' })
  @ApiResponse({ status: 201, description: 'Expense tag created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() dto: CreateExpenseTagDto,
  ) {
    return this.expenseTagsService.create(user_uuid, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense tags for the current user' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseTagsService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an expense tag by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense tag UUID' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.expenseTagsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense tag' })
  @ApiParam({ name: 'uuid', description: 'Expense tag UUID' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: UpdateExpenseTagDto,
  ) {
    return this.expenseTagsService.update(user_uuid, uuid, dto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense tag' })
  @ApiParam({ name: 'uuid', description: 'Expense tag UUID' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.expenseTagsService.remove(user_uuid, uuid);
  }
}
