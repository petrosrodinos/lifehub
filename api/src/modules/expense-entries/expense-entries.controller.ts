import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ExpenseEntriesService } from './expense-entries.service';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { UpdateExpenseEntryDto } from './dto/update-expense-entry.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Controller('expense-entries')
@UseGuards(JwtGuard)
export class ExpenseEntriesController {
  constructor(private readonly expenseEntriesService: ExpenseEntriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createExpenseEntryDto: CreateExpenseEntryDto
  ) {
    return this.expenseEntriesService.create(user_uuid, createExpenseEntryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.expenseEntriesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseEntriesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateExpenseEntryDto: UpdateExpenseEntryDto
  ) {
    return this.expenseEntriesService.update(user_uuid, uuid, updateExpenseEntryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string
  ) {
    return this.expenseEntriesService.remove(user_uuid, uuid);
  }
}
