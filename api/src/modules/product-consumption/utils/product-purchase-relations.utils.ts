import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ProductSource } from '@/generated/prisma';

export type ProductPurchaseRelationFields = {
  product_uuid?: string;
  expense_entry_uuid?: string;
};

export async function validateProductPurchaseRelations(
  prisma: PrismaService,
  user_uuid: string,
  dto: ProductPurchaseRelationFields,
  excludeUuid?: string,
) {
  if (dto.product_uuid) {
    const product = await prisma.expenseProduct.findFirst({
      where: { uuid: dto.product_uuid, source: ProductSource.CONSUMPTION, OR: [{ user_uuid }, { user_uuid: null }] },
    });

    if (!product) {
      throw new BadRequestException('Product not found, does not belong to user, or is not a consumption-tracking product');
    }
  }

  if (dto.expense_entry_uuid) {
    const entry = await prisma.expenseEntry.findFirst({
      where: { uuid: dto.expense_entry_uuid, user_uuid },
    });

    if (!entry) {
      throw new BadRequestException('Expense entry not found or does not belong to user');
    }

    const existingPurchase = await prisma.productPurchase.findFirst({
      where: {
        expense_entry_uuid: dto.expense_entry_uuid,
        ...(excludeUuid ? { uuid: { not: excludeUuid } } : {}),
      },
    });

    if (existingPurchase) {
      throw new BadRequestException('This expense is already linked to a tracked product purchase');
    }
  }
}
