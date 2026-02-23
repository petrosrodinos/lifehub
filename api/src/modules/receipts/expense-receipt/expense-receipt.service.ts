import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateExpenseReceiptDto } from './dto/create-expense-receipt.dto';
import { UpdateExpenseReceiptDto } from './dto/update-expense-receipt.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ExpenseAccount, ExpenseEntry, ExpenseEntryType } from '@/generated/prisma';
import { type ExtractedReceiptItem } from './schemas/extracted-receipt.schema';
import { AiHelperService } from '@/shared/services/ai/ai.service';
import type { ExpenseReceiptsQueryType } from './schemas/expense-receipts-query.schema';

@Injectable()
export class ExpenseReceiptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiHelperService,
  ) { }

  async create(user_uuid: string, createExpenseReceiptDto: CreateExpenseReceiptDto) {
    try {
      await this.validateRelations(user_uuid, createExpenseReceiptDto);

      return await this.prisma.expenseReceipt.create({
        data: {
          user_uuid,
          expense_entry_uuid: createExpenseReceiptDto.expense_entry_uuid,
          store_uuid: createExpenseReceiptDto.store_uuid,
          receipt_date: createExpenseReceiptDto.receipt_date ? new Date(createExpenseReceiptDto.receipt_date) : new Date(),
          total_amount: createExpenseReceiptDto.total_amount,
        },
        include: {
          store: true,
          expense_entry: true,
          items: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create expense receipt');
    }
  }

  async findAll(user_uuid: string, query: ExpenseReceiptsQueryType) {
    try {
      const where: Record<string, unknown> = { user_uuid };

      if (query.store_uuid) {
        where.store_uuid = query.store_uuid;
      }

      return await this.prisma.expenseReceipt.findMany({
        where,
        orderBy: { receipt_date: 'desc' },
        include: {
          store: true,
          expense_entry: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense receipts');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const receipt = await this.prisma.expenseReceipt.findFirst({
        where: { uuid, user_uuid },
        include: {
          store: true,
          expense_entry: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!receipt) {
        throw new NotFoundException('Expense receipt not found');
      }

      return receipt;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch expense receipt');
    }
  }

  async update(user_uuid: string, uuid: string, updateExpenseReceiptDto: UpdateExpenseReceiptDto) {
    try {
      await this.findOne(user_uuid, uuid);

      if (Object.keys(updateExpenseReceiptDto).length > 0) {
        await this.validateRelations(user_uuid, updateExpenseReceiptDto);
      }

      return await this.prisma.expenseReceipt.update({
        where: { uuid },
        data: {
          store_uuid: updateExpenseReceiptDto.store_uuid,
          receipt_date: updateExpenseReceiptDto.receipt_date ? new Date(updateExpenseReceiptDto.receipt_date) : undefined,
          total_amount: updateExpenseReceiptDto.total_amount,
        },
        include: {
          store: true,
          expense_entry: true,
          items: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update expense receipt');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseReceipt.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete expense receipt');
    }
  }

  async upload(
    user_uuid: string,
    imageBuffer: Buffer,
    mimeType: string,
    from_account_uuid?: string,
  ) {

    let account: ExpenseAccount | null = null;

    if (from_account_uuid) {
      account = await this.prisma.expenseAccount.findFirst({
        where: { uuid: from_account_uuid, user_uuid },
      });
    }

    const [categories, subcategories, stores, products] = await Promise.all([
      this.prisma.expenseCategory.findMany({
        where: { OR: [{ user_uuid }, { user_uuid: null }] },
        include: { subcategories: true },
      }),
      this.prisma.expenseSubcategory.findMany({
        where: { OR: [{ user_uuid }, { user_uuid: null }] },
        include: { category: true },
      }),
      this.prisma.expenseStore.findMany({
        where: { OR: [{ user_uuid }, { user_uuid: null }] },
      }),
      this.prisma.expenseProduct.findMany({
        where: { OR: [{ user_uuid }, { user_uuid: null }] },
      }),
    ]);
    const categoryNames = [...new Set(categories.map((c) => c.name))].join(', ');

    const subcategoriesContext = subcategories.map((s) => ({
      categoryName: s.category.name,
      subcategoryName: s.name,
    })).map((s) => `${s.categoryName} > ${s.subcategoryName}`).join('; ');

    const storeNames = stores.map((s) => s.name).join(', ');

    const productNames = products.map((p) => p.name).join(', ');

    const { receiptDate, extracted } = await this.aiService.getReceiptData({
      categoryNames,
      subcategoriesContext,
      storeNames,
      productNames,
      imageBuffer,
      mimeType,
    });

    return await this.prisma.$transaction(
      async (tx) => {
        let entry: ExpenseEntry | null = null;
        if (account) {
          entry = await tx.expenseEntry.create({
            data: {
              user_uuid,
              type: ExpenseEntryType.EXPENSE,
              amount: extracted.total_amount,
              from_account_uuid,
              to_account_uuid: null,
              category_uuid: null,
              subcategory_uuid: null,
              entry_date: receiptDate,
            },
          });
        }
        const store = await this.findOrCreateStore(tx, user_uuid, extracted.store_name);
        const receipt = await tx.expenseReceipt.create({
          data: {
            user_uuid,
            expense_entry_uuid: entry?.uuid ?? null,
            store_uuid: store.uuid,
            receipt_date: receiptDate,
            total_amount: extracted.total_amount,
          },
        });
        for (const item of extracted.items) {
          const product = await this.findOrCreateProduct(tx, user_uuid, item);
          await tx.expenseReceiptItem.create({
            data: {
              receipt_uuid: receipt.uuid,
              product_uuid: product.uuid,
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price,
            },
          });
        }
        await tx.expenseAccount.update({
          where: { uuid: from_account_uuid },
          data: { balance: { decrement: extracted.total_amount } },
        });
        return tx.expenseReceipt.findUniqueOrThrow({
          where: { uuid: receipt.uuid },
          include: {
            store: true,
            expense_entry: true,
            items: { include: { product: true } },
          },
        });
      },
      { timeout: 30000 },
    );
  }

  private async findOrCreateStore(
    tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
    user_uuid: string,
    name: string,
  ) {
    const normalized = name.trim();
    const existing = await tx.expenseStore.findFirst({
      where: {
        OR: [{ user_uuid }, { user_uuid: null }],
        name: { equals: normalized, mode: 'insensitive' },
      },
    });
    if (existing) return existing;
    return tx.expenseStore.create({
      data: { user_uuid, name: normalized },
    });
  }

  private async findOrCreateProduct(
    tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
    user_uuid: string,
    item: ExtractedReceiptItem,
  ) {
    const productName = item.product_name.trim();
    const existing = await tx.expenseProduct.findFirst({
      where: {
        OR: [{ user_uuid }, { user_uuid: null }],
        name: { equals: productName, mode: 'insensitive' },
      },
    });
    if (existing) return existing;
    let category_uuid: string | null = null;
    let subcategory_uuid: string | null = null;
    if (item.category_name?.trim()) {
      const category = await this.findOrCreateCategory(tx, user_uuid, item.category_name.trim());
      category_uuid = category.uuid;
      if (item.subcategory_name?.trim()) {
        const sub = await this.findOrCreateSubcategory(tx, user_uuid, category.uuid, item.subcategory_name.trim());
        subcategory_uuid = sub.uuid;
      }
    }
    return tx.expenseProduct.create({
      data: {
        user_uuid,
        name: productName,
        category_uuid,
        subcategory_uuid,
      },
    });
  }

  private async findOrCreateCategory(
    tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
    user_uuid: string,
    name: string,
  ) {
    const existing = await tx.expenseCategory.findFirst({
      where: {
        OR: [{ user_uuid }, { user_uuid: null }],
        name: { equals: name, mode: 'insensitive' },
      },
    });
    if (existing) return existing;
    return tx.expenseCategory.create({
      data: { user_uuid, name },
    });
  }

  private async findOrCreateSubcategory(
    tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
    user_uuid: string,
    category_uuid: string,
    name: string,
  ) {
    const existing = await tx.expenseSubcategory.findFirst({
      where: {
        category_uuid,
        OR: [{ user_uuid }, { user_uuid: null }],
        name: { equals: name, mode: 'insensitive' },
      },
    });
    if (existing) return existing;
    return tx.expenseSubcategory.create({
      data: { user_uuid, category_uuid, name },
    });
  }

  private async validateRelations(user_uuid: string, dto: Partial<CreateExpenseReceiptDto>): Promise<void> {
    if (dto.expense_entry_uuid) {
      const entry = await this.prisma.expenseEntry.findFirst({
        where: { uuid: dto.expense_entry_uuid, user_uuid },
      });

      if (!entry) {
        throw new BadRequestException('Expense entry not found or does not belong to user');
      }
    }

    if (dto.store_uuid) {
      const store = await this.prisma.expenseStore.findFirst({
        where: {
          uuid: dto.store_uuid,
          OR: [
            { user_uuid },
            { user_uuid: null },
          ],
        },
      });

      if (!store) {
        throw new BadRequestException('Expense store not found or does not belong to user');
      }
    }
  }
}
