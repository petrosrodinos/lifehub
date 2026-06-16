import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExpenseEntryPresetsService } from './expense-entry-presets.service';
import { CreateExpenseEntryPresetDto } from './dto/create-expense-entry-preset.dto';
import { UpdateExpenseEntryPresetDto } from './dto/update-expense-entry-preset.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Expense Entry Presets')
@ApiBearerAuth()
@Controller('expense-entry-presets')
@UseGuards(JwtGuard)
export class ExpenseEntryPresetsController {
  constructor(private readonly expenseEntryPresetsService: ExpenseEntryPresetsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new expense entry preset' })
  @ApiResponse({ status: 201, description: 'Expense entry preset created successfully' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() dto: CreateExpenseEntryPresetDto,
  ) {
    return this.expenseEntryPresetsService.create(user_uuid, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all expense entry presets for the current user' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseEntryPresetsService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an expense entry preset by UUID' })
  @ApiParam({ name: 'uuid', description: 'Expense entry preset UUID' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.expenseEntryPresetsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an expense entry preset' })
  @ApiParam({ name: 'uuid', description: 'Expense entry preset UUID' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: UpdateExpenseEntryPresetDto,
  ) {
    return this.expenseEntryPresetsService.update(user_uuid, uuid, dto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an expense entry preset' })
  @ApiParam({ name: 'uuid', description: 'Expense entry preset UUID' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.expenseEntryPresetsService.remove(user_uuid, uuid);
  }
}
