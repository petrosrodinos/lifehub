import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateProductPurchaseDto } from './dto/create-product-purchase.dto';
import { UpdateProductPurchaseDto } from './dto/update-product-purchase.dto';
import { CreateFromExpenseDto, InlineProductDto } from './dto/create-from-expense.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ExpenseEntriesService } from '../expenses/expense-entries/expense-entries.service';
import { ExpenseEntryType, ProductPurchaseStatus, ProductSource } from '@/generated/prisma';
import { ProductPurchasesQueryType } from './schemas/product-purchases-query.schema';
import { DashboardQueryType } from './schemas/dashboard-query.schema';
import { ProductAnalyticsQueryType } from './schemas/product-analytics-query.schema';
import { ComparisonQueryType } from './schemas/comparison-query.schema';
import { validateProductPurchaseRelations } from './utils/product-purchase-relations.utils';
import {
  costPerUnit,
  costPerUse,
  costPerDay,
  costPerMonth,
  costPerYear,
  expectedLifespanDays,
  actualLifespanDays,
  estimatedFinishDate,
  remainingDays,
  averageLifespan,
  averageCostPerDay,
  averagePurchasePrice,
  repurchaseInterval,
  totalProductSpend,
  deriveStatus,
} from './utils/consumption-calculations.utils';

@Injectable()
export class ProductConsumptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly expenseEntriesService: ExpenseEntriesService,
  ) { }

  async create(user_uuid: string, dto: CreateProductPurchaseDto) {
    try {
      if (!dto.expense_entry_uuid && !dto.create_expense && (dto.purchase_price === undefined || dto.purchase_price === null)) {
        throw new BadRequestException('purchase_price is required when not linking or creating an expense');
      }

      await validateProductPurchaseRelations(this.prisma, user_uuid, {
        product_uuid: dto.product_uuid,
        expense_entry_uuid: dto.expense_entry_uuid,
      });

      let expense_entry_uuid = dto.expense_entry_uuid;
      let purchase_price = dto.purchase_price;
      let purchase_date = dto.purchase_date ? new Date(dto.purchase_date) : new Date();

      if (expense_entry_uuid) {
        const entry = await this.prisma.expenseEntry.findFirst({ where: { uuid: expense_entry_uuid, user_uuid } });

        if (!entry) {
          throw new BadRequestException('Expense entry not found or does not belong to user');
        }

        purchase_price = Number(entry.amount);
        purchase_date = entry.entry_date;
      } else if (dto.create_expense) {
        if (!dto.from_account_uuid) {
          throw new BadRequestException('from_account_uuid is required to create a linked expense');
        }

        if (purchase_price === undefined || purchase_price === null) {
          throw new BadRequestException('purchase_price is required to create a linked expense');
        }

        const product = await this.prisma.expenseProduct.findFirst({ where: { uuid: dto.product_uuid, source: ProductSource.CONSUMPTION } });

        const createdEntry = await this.expenseEntriesService.create(user_uuid, {
          type: ExpenseEntryType.EXPENSE,
          amount: purchase_price,
          from_account_uuid: dto.from_account_uuid,
          category_uuid: dto.category_uuid ?? product?.category_uuid ?? undefined,
          subcategory_uuid: dto.subcategory_uuid ?? product?.subcategory_uuid ?? undefined,
          entry_date: purchase_date.toISOString(),
          description: dto.description ?? product?.name,
        });

        expense_entry_uuid = createdEntry.uuid;
        purchase_date = createdEntry.entry_date;
        purchase_price = Number(createdEntry.amount);
      }

      if (purchase_price === undefined || purchase_price === null) {
        throw new BadRequestException('purchase_price is required');
      }

      const start_date = dto.start_date ? new Date(dto.start_date) : null;
      const actual_finish_date = dto.actual_finish_date ? new Date(dto.actual_finish_date) : null;
      const status = deriveStatus({ start_date, actual_finish_date }, dto.status);

      const created = await this.prisma.productPurchase.create({
        data: {
          user_uuid,
          product_uuid: dto.product_uuid,
          expense_entry_uuid,
          tracking_method: dto.tracking_method,
          status,
          purchase_price,
          purchase_date,
          start_date: start_date ?? undefined,
          actual_finish_date: actual_finish_date ?? undefined,
          total_units: dto.total_units,
          unit_label: dto.unit_label,
          consumption_amount: dto.consumption_amount,
          consumption_period_days: dto.consumption_period_days ?? 1,
          notes: dto.notes,
        },
      });

      return this.findOne(user_uuid, created.uuid);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create product purchase');
    }
  }

  async createFromExpense(user_uuid: string, expense_entry_uuid: string, dto: CreateFromExpenseDto) {
    try {
      const entry = await this.prisma.expenseEntry.findFirst({ where: { uuid: expense_entry_uuid, user_uuid } });

      if (!entry) {
        throw new NotFoundException('Expense entry not found');
      }

      if (entry.type !== ExpenseEntryType.EXPENSE) {
        throw new BadRequestException('Only EXPENSE entries can be tracked as a product purchase');
      }

      const existingPurchase = await this.prisma.productPurchase.findFirst({ where: { expense_entry_uuid } });

      if (existingPurchase) {
        throw new BadRequestException('This expense is already tracked as a product purchase');
      }

      const product_uuid = await this.resolveProduct(user_uuid, entry, dto.product_uuid, dto.product);

      const start_date = dto.start_date ? new Date(dto.start_date) : null;
      const status = deriveStatus({ start_date, actual_finish_date: null });

      const created = await this.prisma.productPurchase.create({
        data: {
          user_uuid,
          product_uuid,
          expense_entry_uuid: entry.uuid,
          tracking_method: dto.tracking_method,
          status,
          purchase_price: entry.amount,
          purchase_date: entry.entry_date,
          start_date: start_date ?? undefined,
          total_units: dto.total_units,
          unit_label: dto.unit_label,
          consumption_amount: dto.consumption_amount,
          consumption_period_days: dto.consumption_period_days ?? 1,
          notes: dto.notes,
        },
      });

      return this.findOne(user_uuid, created.uuid);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to track product usage from expense');
    }
  }

  async findAll(user_uuid: string, query: ProductPurchasesQueryType) {
    try {
      const { page, limit, product_uuid, status, tracking_method, search } = query;
      const skip = (page - 1) * limit;

      const where: any = { user_uuid };

      if (product_uuid) {
        where.product_uuid = product_uuid;
      }

      if (status) {
        where.status = status;
      }

      if (tracking_method) {
        where.tracking_method = tracking_method;
      }

      if (search) {
        where.product = { name: { contains: search, mode: 'insensitive' } };
      }

      const [data, total] = await Promise.all([
        this.prisma.productPurchase.findMany({
          where,
          skip,
          take: limit,
          orderBy: { purchase_date: 'desc' },
          include: this.getPurchaseIncludes(),
        }),
        this.prisma.productPurchase.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: data.map((p) => this.withCalculations(p)),
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch product purchases');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const purchase = await this.prisma.productPurchase.findFirst({
        where: { uuid, user_uuid },
        include: this.getPurchaseIncludes(),
      });

      if (!purchase) {
        throw new NotFoundException('Product purchase not found');
      }

      return this.withCalculations(purchase);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch product purchase');
    }
  }

  async update(user_uuid: string, uuid: string, dto: UpdateProductPurchaseDto) {
    try {
      const existing = await this.prisma.productPurchase.findFirst({ where: { uuid, user_uuid } });

      if (!existing) {
        throw new NotFoundException('Product purchase not found');
      }

      if (dto.product_uuid) {
        await validateProductPurchaseRelations(this.prisma, user_uuid, { product_uuid: dto.product_uuid });
      }

      const start_date = dto.start_date !== undefined ? (dto.start_date ? new Date(dto.start_date) : null) : existing.start_date;
      const actual_finish_date =
        dto.actual_finish_date !== undefined ? (dto.actual_finish_date ? new Date(dto.actual_finish_date) : null) : existing.actual_finish_date;

      const isManualStatus = existing.status === ProductPurchaseStatus.PAUSED || existing.status === ProductPurchaseStatus.DISCARDED;
      const status = dto.status ?? deriveStatus({ start_date, actual_finish_date }, isManualStatus ? existing.status : undefined);

      await this.prisma.productPurchase.update({
        where: { uuid },
        data: {
          product_uuid: dto.product_uuid,
          tracking_method: dto.tracking_method,
          status,
          start_date: dto.start_date !== undefined ? start_date : undefined,
          actual_finish_date: dto.actual_finish_date !== undefined ? actual_finish_date : undefined,
          total_units: dto.total_units,
          unit_label: dto.unit_label,
          consumption_amount: dto.consumption_amount,
          consumption_period_days: dto.consumption_period_days,
          notes: dto.notes,
        },
      });

      return this.findOne(user_uuid, uuid);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update product purchase');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      const existing = await this.prisma.productPurchase.findFirst({ where: { uuid, user_uuid } });

      if (!existing) {
        throw new NotFoundException('Product purchase not found');
      }

      return await this.prisma.productPurchase.delete({ where: { uuid } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete product purchase');
    }
  }

  async getDashboardSummary(user_uuid: string, query: DashboardQueryType) {
    try {
      const activePurchases = await this.prisma.productPurchase.findMany({
        where: { user_uuid, status: ProductPurchaseStatus.ACTIVE },
        include: this.getPurchaseIncludes(),
      });

      const withCalc = activePurchases.map((p) => this.withCalculations(p));

      let totalDailyCost = 0;
      let provisionalCount = 0;

      withCalc.forEach((p) => {
        if (p.cost_per_day !== null) {
          totalDailyCost += p.cost_per_day;

          if (p.cost_per_day_is_provisional) {
            provisionalCount += 1;
          }
        }
      });

      const finishingSoon = withCalc
        .filter((p) => p.remaining_days !== null && p.remaining_days >= 0 && p.remaining_days <= query.finishing_soon_days)
        .sort((a, b) => (a.remaining_days ?? 0) - (b.remaining_days ?? 0));

      return {
        active_products: withCalc.length,
        total_daily_cost: totalDailyCost,
        total_monthly_cost: costPerMonth(totalDailyCost),
        total_annual_cost: costPerYear(totalDailyCost),
        provisional_count: provisionalCount,
        finishing_soon: finishingSoon,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch dashboard summary');
    }
  }

  async getProductSummary(user_uuid: string, product_uuid: string) {
    try {
      const product = await this.prisma.expenseProduct.findFirst({
        where: { uuid: product_uuid, source: ProductSource.CONSUMPTION, OR: [{ user_uuid }, { user_uuid: null }] },
        include: { category: true, subcategory: true },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const purchases = await this.prisma.productPurchase.findMany({
        where: { user_uuid, product_uuid },
        orderBy: { purchase_date: 'asc' },
        include: { expense_entry: true },
      });

      const withCalc = purchases.map((p) => this.withCalculations(p));
      const costsPerDay = withCalc.map((p) => p.cost_per_day);
      const priceRows = purchases.map((p) => ({ purchase_price: Number(p.purchase_price) }));
      const dateRows = purchases.map((p) => ({ purchase_date: p.purchase_date }));

      const currentPurchase = withCalc.find((p) => p.status === ProductPurchaseStatus.ACTIVE) ?? withCalc[withCalc.length - 1] ?? null;

      return {
        product,
        purchases: withCalc,
        current_purchase: currentPurchase,
        purchase_count: purchases.length,
        lifetime_spend: totalProductSpend(priceRows),
        average_purchase_price: averagePurchasePrice(priceRows),
        average_lifespan_days: averageLifespan(purchases),
        average_cost_per_day: averageCostPerDay(costsPerDay),
        repurchase_interval_days: repurchaseInterval(dateRows),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch product summary');
    }
  }

  async getMostExpensivePerDay(user_uuid: string, query: ProductAnalyticsQueryType) {
    try {
      const rollups = await this.getProductRollups(user_uuid, query);

      return rollups
        .filter((r) => r.average_cost_per_day !== null)
        .sort((a, b) => (b.average_cost_per_day ?? 0) - (a.average_cost_per_day ?? 0))
        .slice(0, query.limit);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch most expensive per day analytics');
    }
  }

  async getMostExpensivePerMonth(user_uuid: string, query: ProductAnalyticsQueryType) {
    try {
      const rollups = await this.getProductRollups(user_uuid, query);

      return rollups
        .filter((r) => r.average_cost_per_day !== null)
        .map((r) => ({ ...r, average_cost_per_month: costPerMonth(r.average_cost_per_day as number) }))
        .sort((a, b) => b.average_cost_per_month - a.average_cost_per_month)
        .slice(0, query.limit);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch most expensive per month analytics');
    }
  }

  async getLongestLasting(user_uuid: string, query: ProductAnalyticsQueryType) {
    try {
      const rollups = await this.getProductRollups(user_uuid, query);

      return rollups
        .filter((r) => r.average_lifespan_days !== null)
        .sort((a, b) => (b.average_lifespan_days ?? 0) - (a.average_lifespan_days ?? 0))
        .slice(0, query.limit);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch longest lasting analytics');
    }
  }

  async getFastestConsumed(user_uuid: string, query: ProductAnalyticsQueryType) {
    try {
      const rollups = await this.getProductRollups(user_uuid, query);

      return rollups
        .filter((r) => r.average_lifespan_days !== null)
        .sort((a, b) => (a.average_lifespan_days ?? 0) - (b.average_lifespan_days ?? 0))
        .slice(0, query.limit);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch fastest consumed analytics');
    }
  }

  async getMostFrequentlyPurchased(user_uuid: string, query: ProductAnalyticsQueryType) {
    try {
      const rollups = await this.getProductRollups(user_uuid, query);

      return rollups
        .filter((r) => r.repurchase_interval_days !== null)
        .sort((a, b) => (a.repurchase_interval_days ?? 0) - (b.repurchase_interval_days ?? 0))
        .slice(0, query.limit);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch most frequently purchased analytics');
    }
  }

  async getCategoryConsumptionCost(user_uuid: string, query: ProductAnalyticsQueryType) {
    try {
      const rollups = await this.getProductRollups(user_uuid, query);

      const categoryMap = new Map<string, { uuid: string; name: string; color: string; total_monthly_cost: number; product_count: number }>();

      rollups.forEach((r) => {
        const category = r.product.category;
        const key = category?.uuid ?? 'uncategorized';
        const monthly = r.average_cost_per_day !== null ? costPerMonth(r.average_cost_per_day) : 0;

        if (!categoryMap.has(key)) {
          categoryMap.set(key, {
            uuid: key,
            name: category?.name ?? 'Uncategorized',
            color: category?.color ?? '#8b5cf6',
            total_monthly_cost: 0,
            product_count: 0,
          });
        }

        const current = categoryMap.get(key)!;
        current.total_monthly_cost += monthly;
        current.product_count += 1;
      });

      return Array.from(categoryMap.values()).sort((a, b) => b.total_monthly_cost - a.total_monthly_cost);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch category consumption cost analytics');
    }
  }

  async compareProducts(user_uuid: string, query: ComparisonQueryType) {
    try {
      const products = await this.prisma.expenseProduct.findMany({
        where: { uuid: { in: query.product_uuids }, source: ProductSource.CONSUMPTION, OR: [{ user_uuid }, { user_uuid: null }] },
        include: { category: true, subcategory: true },
      });

      if (products.length !== query.product_uuids.length) {
        throw new BadRequestException('One or more products not found or do not belong to user');
      }

      const entries = await Promise.all(
        query.product_uuids.map(async (product_uuid) => {
          const purchases = await this.prisma.productPurchase.findMany({
            where: { user_uuid, product_uuid },
            orderBy: { purchase_date: 'desc' },
          });

          const withCalc = purchases.map((p) => this.withCalculations(p));
          const costsPerDay = withCalc.map((p) => p.cost_per_day);
          const latest = withCalc[0] ?? null;

          return {
            product: products.find((p) => p.uuid === product_uuid)!,
            latest_purchase_price: latest ? Number(latest.purchase_price) : null,
            average_cost_per_day: averageCostPerDay(costsPerDay),
            average_lifespan_days: averageLifespan(purchases),
            purchase_count: purchases.length,
          };
        }),
      );

      return { products: entries, insight: this.buildComparisonInsight(entries) };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to compare products');
    }
  }

  private buildComparisonInsight(
    entries: { product: { uuid: string; name: string }; latest_purchase_price: number | null; average_cost_per_day: number | null }[],
  ) {
    const withCost = entries.filter((e) => e.average_cost_per_day !== null && e.latest_purchase_price !== null);

    if (withCost.length !== 2) {
      return null;
    }

    const [a, b] = withCost;
    const cheaperPerDay = a.average_cost_per_day! <= b.average_cost_per_day! ? a : b;
    const pricierPerDay = cheaperPerDay === a ? b : a;

    if ((cheaperPerDay.latest_purchase_price ?? 0) <= (pricierPerDay.latest_purchase_price ?? 0)) {
      return null;
    }

    const percentCheaperPerDay =
      pricierPerDay.average_cost_per_day! > 0 ? Math.round((1 - cheaperPerDay.average_cost_per_day! / pricierPerDay.average_cost_per_day!) * 100) : 0;

    return {
      cheaper_product_uuid: cheaperPerDay.product.uuid,
      pricier_product_uuid: pricierPerDay.product.uuid,
      percent_cheaper_per_day: percentCheaperPerDay,
      price_difference: (cheaperPerDay.latest_purchase_price ?? 0) - (pricierPerDay.latest_purchase_price ?? 0),
    };
  }

  private async resolveProduct(
    user_uuid: string,
    entry: { category_uuid: string | null; subcategory_uuid: string | null },
    product_uuid?: string,
    inline?: InlineProductDto,
  ): Promise<string> {
    if (product_uuid) {
      const product = await this.prisma.expenseProduct.findFirst({
        where: { uuid: product_uuid, source: ProductSource.CONSUMPTION, OR: [{ user_uuid }, { user_uuid: null }] },
      });

      if (!product) {
        throw new BadRequestException('Product not found, does not belong to user, or is not a consumption-tracking product');
      }

      return product.uuid;
    }

    if (!inline?.name) {
      throw new BadRequestException('Either product_uuid or product.name is required');
    }

    const existing = await this.prisma.expenseProduct.findFirst({
      where: { user_uuid, source: ProductSource.CONSUMPTION, name: { equals: inline.name, mode: 'insensitive' } },
    });

    if (existing) {
      return existing.uuid;
    }

    const created = await this.prisma.expenseProduct.create({
      data: {
        user_uuid,
        name: inline.name,
        brand: inline.brand,
        unit: inline.unit,
        size: inline.size,
        source: ProductSource.CONSUMPTION,
        category_uuid: inline.category_uuid ?? entry.category_uuid ?? undefined,
        subcategory_uuid: inline.subcategory_uuid ?? entry.subcategory_uuid ?? undefined,
      },
    });

    return created.uuid;
  }

  private async getProductRollups(user_uuid: string, query: { from_date?: Date; to_date?: Date; category_uuid?: string }) {
    const where: any = { user_uuid };

    if (query.category_uuid) {
      where.product = { category_uuid: query.category_uuid };
    }

    if (query.from_date || query.to_date) {
      where.purchase_date = {};

      if (query.from_date) {
        where.purchase_date.gte = query.from_date;
      }

      if (query.to_date) {
        where.purchase_date.lte = query.to_date;
      }
    }

    const purchases = await this.prisma.productPurchase.findMany({
      where,
      include: this.getPurchaseIncludes(),
      orderBy: { purchase_date: 'asc' },
    });

    const byProduct = new Map<string, typeof purchases>();

    purchases.forEach((p) => {
      const list = byProduct.get(p.product_uuid) ?? [];
      list.push(p);
      byProduct.set(p.product_uuid, list);
    });

    return Array.from(byProduct.values()).map((productPurchases) => {
      const withCalc = productPurchases.map((p) => this.withCalculations(p));
      const costsPerDay = withCalc.map((p) => p.cost_per_day);
      const priceRows = productPurchases.map((p) => ({ purchase_price: Number(p.purchase_price) }));
      const dateRows = productPurchases.map((p) => ({ purchase_date: p.purchase_date }));

      return {
        product: productPurchases[0].product,
        purchase_count: productPurchases.length,
        average_cost_per_day: averageCostPerDay(costsPerDay),
        average_lifespan_days: averageLifespan(productPurchases),
        average_purchase_price: averagePurchasePrice(priceRows),
        repurchase_interval_days: repurchaseInterval(dateRows),
        total_spend: totalProductSpend(priceRows),
        latest_status: productPurchases[productPurchases.length - 1].status,
      };
    });
  }

  private getPurchaseIncludes() {
    return {
      product: { include: { category: true, subcategory: true } },
      expense_entry: true,
    };
  }

  private withCalculations<
    T extends {
      tracking_method: any;
      purchase_price: any;
      total_units: any;
      consumption_amount: any;
      consumption_period_days: number | null;
      start_date: Date | null;
      actual_finish_date: Date | null;
    },
  >(purchase: T) {
    const calcInput = {
      tracking_method: purchase.tracking_method,
      purchase_price: Number(purchase.purchase_price),
      total_units: purchase.total_units !== null && purchase.total_units !== undefined ? Number(purchase.total_units) : null,
      consumption_amount: purchase.consumption_amount !== null && purchase.consumption_amount !== undefined ? Number(purchase.consumption_amount) : null,
      consumption_period_days: purchase.consumption_period_days,
      start_date: purchase.start_date,
      actual_finish_date: purchase.actual_finish_date,
    };

    const { value: costPerDayValue, isProvisional } = costPerDay(calcInput);
    const expectedLifespan = expectedLifespanDays(calcInput);
    const actualLifespan = actualLifespanDays(calcInput);
    const perUnit = costPerUnit(calcInput.purchase_price, calcInput.total_units);
    const perUse = perUnit !== null && calcInput.consumption_amount !== null ? costPerUse(perUnit, calcInput.consumption_amount) : null;
    const estFinishDate = purchase.start_date && expectedLifespan !== null ? estimatedFinishDate(purchase.start_date, expectedLifespan) : null;
    const remaining = estFinishDate ? remainingDays(estFinishDate) : null;

    return {
      ...purchase,
      cost_per_unit: perUnit,
      cost_per_use: perUse,
      cost_per_day: costPerDayValue,
      cost_per_day_is_provisional: isProvisional,
      cost_per_month: costPerDayValue !== null ? costPerMonth(costPerDayValue) : null,
      cost_per_year: costPerDayValue !== null ? costPerYear(costPerDayValue) : null,
      expected_lifespan_days: expectedLifespan,
      actual_lifespan_days: actualLifespan,
      estimated_finish_date: estFinishDate,
      remaining_days: remaining,
    };
  }
}
