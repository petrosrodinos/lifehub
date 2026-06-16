import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

export type ExpenseRelationFields = {
  from_account_uuid?: string;
  to_account_uuid?: string;
  category_uuid?: string;
  subcategory_uuid?: string;
};

export async function validateExpenseRelations(
  prisma: PrismaService,
  user_uuid: string,
  dto: ExpenseRelationFields,
) {
  if (dto.from_account_uuid) {
    const fromAccount = await prisma.expenseAccount.findFirst({
      where: { uuid: dto.from_account_uuid, user_uuid },
    });

    if (!fromAccount) {
      throw new BadRequestException('Source account not found or does not belong to user');
    }
  }

  if (dto.to_account_uuid) {
    const toAccount = await prisma.expenseAccount.findFirst({
      where: { uuid: dto.to_account_uuid, user_uuid },
    });

    if (!toAccount) {
      throw new BadRequestException('Destination account not found or does not belong to user');
    }
  }

  if (dto.category_uuid) {
    const category = await prisma.expenseCategory.findFirst({
      where: { uuid: dto.category_uuid, OR: [{ user_uuid }, { user_uuid: null }] },
    });

    if (!category) {
      throw new BadRequestException('Category not found or does not belong to user');
    }
  }

  if (dto.subcategory_uuid) {
    const subcategory = await prisma.expenseSubcategory.findFirst({
      where: { uuid: dto.subcategory_uuid, OR: [{ user_uuid }, { user_uuid: null }] },
    });

    if (!subcategory) {
      throw new BadRequestException('Subcategory not found or does not belong to user');
    }

    if (dto.category_uuid && subcategory.category_uuid !== dto.category_uuid) {
      throw new BadRequestException('Subcategory does not belong to the selected category');
    }
  }
}

export async function validateExpenseTags(
  prisma: PrismaService,
  user_uuid: string,
  tag_uuids: string[],
) {
  if (tag_uuids.length === 0) {
    return;
  }

  const count = await prisma.expenseTag.count({
    where: {
      user_uuid,
      uuid: { in: tag_uuids },
    },
  });

  if (count !== tag_uuids.length) {
    throw new BadRequestException('One or more tags not found or do not belong to user');
  }
}
