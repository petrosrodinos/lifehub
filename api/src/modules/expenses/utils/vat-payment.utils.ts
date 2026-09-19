import { BadRequestException } from '@nestjs/common';
import { ExpenseEntryType } from '@/generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

export type VatPaymentSettings = {
  vat_payment_category_uuid: string | null;
  vat_payment_subcategory_uuid: string | null;
};

export type VatPaymentWhere = {
  type: ExpenseEntryType;
  category_uuid: string;
  subcategory_uuid: string;
};

export async function getVatPaymentSettings(prisma: PrismaService, user_uuid: string): Promise<VatPaymentSettings> {
  const settings = await prisma.businessSettings.findUnique({
    where: { user_uuid },
    select: { vat_payment_category_uuid: true, vat_payment_subcategory_uuid: true },
  });

  return {
    vat_payment_category_uuid: settings?.vat_payment_category_uuid ?? null,
    vat_payment_subcategory_uuid: settings?.vat_payment_subcategory_uuid ?? null,
  };
}

export function buildVatPaymentWhere(settings: VatPaymentSettings): VatPaymentWhere | null {
  if (!settings.vat_payment_category_uuid || !settings.vat_payment_subcategory_uuid) {
    return null;
  }

  return {
    type: ExpenseEntryType.EXPENSE,
    category_uuid: settings.vat_payment_category_uuid,
    subcategory_uuid: settings.vat_payment_subcategory_uuid,
  };
}

export function isVatPaymentEntry(
  settings: VatPaymentSettings,
  entry: { type: ExpenseEntryType; category_uuid?: string | null; subcategory_uuid?: string | null },
): boolean {
  const paymentWhere = buildVatPaymentWhere(settings);

  if (!paymentWhere) {
    return false;
  }

  return (
    entry.type === paymentWhere.type &&
    entry.category_uuid === paymentWhere.category_uuid &&
    entry.subcategory_uuid === paymentWhere.subcategory_uuid
  );
}

export type VatPeriodFields = {
  vat_period_year: number | null;
  vat_period_month: number | null;
};

export function resolveVatPeriodFields(
  settings: VatPaymentSettings,
  entry: {
    type: ExpenseEntryType;
    category_uuid?: string | null;
    subcategory_uuid?: string | null;
    vat_period_year?: number | null;
    vat_period_month?: number | null;
  },
): VatPeriodFields {
  if (!isVatPaymentEntry(settings, entry)) {
    return { vat_period_year: null, vat_period_month: null };
  }

  if (!entry.vat_period_year || !entry.vat_period_month) {
    throw new BadRequestException('VAT period is required for VAT payments');
  }

  return { vat_period_year: entry.vat_period_year, vat_period_month: entry.vat_period_month };
}

export function buildVatTransactionsClause(
  paymentWhere: VatPaymentWhere,
  period: { year: number; month: number },
  entryDate?: Record<string, Date>,
) {
  const vatBranch = { has_vat: true, ...(entryDate ? { entry_date: entryDate } : {}) };

  return {
    OR: [
      vatBranch,
      { ...paymentWhere, vat_period_year: period.year, vat_period_month: period.month },
    ],
  };
}
