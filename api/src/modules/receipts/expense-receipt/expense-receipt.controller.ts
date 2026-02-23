import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ExpenseReceiptService } from './expense-receipt.service';
import { CreateExpenseReceiptDto } from './dto/create-expense-receipt.dto';
import { UpdateExpenseReceiptDto } from './dto/update-expense-receipt.dto';
import { UploadReceiptDto } from './dto/upload-receipt.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

const RECEIPT_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

@ApiTags('Expense Receipts')
@ApiBearerAuth()
@Controller('expense-receipts')
@UseGuards(JwtGuard)
export class ExpenseReceiptController {
  constructor(private readonly expenseReceiptService: ExpenseReceiptService) { }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('receipt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        receipt: { type: 'string', format: 'binary' },
        from_account_uuid: { type: 'string', format: 'uuid', nullable: true },
      },
      required: ['receipt', 'from_account_uuid'],
    },
  })
  @ApiOperation({ summary: 'Upload receipt image and create expense from extracted data' })
  @ApiResponse({ status: 201, description: 'Receipt processed and expense created' })
  @ApiResponse({ status: 400, description: 'Invalid file or account' })
  async upload(
    @CurrentUser('user_uuid') user_uuid: string,
    @UploadedFile() file: { buffer: Buffer; mimetype: string },
    @Body() dto: UploadReceiptDto,
  ) {
    if (!file?.buffer) {
      throw new BadRequestException('Receipt image file is required');
    }
    if (!RECEIPT_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(`File type must be one of: ${RECEIPT_MIME_TYPES.join(', ')}`);
    }
    return this.expenseReceiptService.upload(user_uuid, file.buffer, file.mimetype, dto.from_account_uuid);
  }

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
