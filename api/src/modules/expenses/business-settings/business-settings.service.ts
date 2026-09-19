import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { validateExpenseRelations } from '../utils/expense-relations.utils';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto';

@Injectable()
export class BusinessSettingsService {
  constructor(private readonly prisma: PrismaService) { }

  async get(user_uuid: string) {
    try {
      const settings = await this.prisma.businessSettings.findUnique({ where: { user_uuid } });

      return {
        vat_payment_category_uuid: settings?.vat_payment_category_uuid ?? null,
        vat_payment_subcategory_uuid: settings?.vat_payment_subcategory_uuid ?? null,
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch business settings');
    }
  }

  async update(user_uuid: string, dto: UpdateBusinessSettingsDto) {
    const categoryUuid = dto.vat_payment_category_uuid ?? null;
    const subcategoryUuid = dto.vat_payment_subcategory_uuid ?? null;

    if (Boolean(categoryUuid) !== Boolean(subcategoryUuid)) {
      throw new BadRequestException('VAT payment category and subcategory must be set together');
    }

    if (categoryUuid && subcategoryUuid) {
      await validateExpenseRelations(this.prisma, user_uuid, {
        category_uuid: categoryUuid,
        subcategory_uuid: subcategoryUuid,
      });
    }

    try {
      await this.prisma.businessSettings.upsert({
        where: { user_uuid },
        create: {
          user_uuid,
          vat_payment_category_uuid: categoryUuid,
          vat_payment_subcategory_uuid: subcategoryUuid,
        },
        update: {
          vat_payment_category_uuid: categoryUuid,
          vat_payment_subcategory_uuid: subcategoryUuid,
        },
      });

      return this.get(user_uuid);
    } catch {
      throw new InternalServerErrorException('Failed to update business settings');
    }
  }
}
