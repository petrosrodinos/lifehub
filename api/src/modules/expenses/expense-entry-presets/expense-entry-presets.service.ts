import { Injectable, InternalServerErrorException, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateExpenseEntryPresetDto } from './dto/create-expense-entry-preset.dto';
import { UpdateExpenseEntryPresetDto } from './dto/update-expense-entry-preset.dto';
import { validateExpenseRelations, validateExpenseTags } from '../utils/expense-relations.utils';
import {
  normalizePresetRecurrenceFields,
  validatePresetRecurrence,
} from '../utils/preset-recurrence-validation.helper';
import { buildRecurrenceConfig, getNextOccurrenceDate } from '../utils/preset-recurrence.helper';

@Injectable()
export class ExpenseEntryPresetsService {
  private readonly logger = new Logger(ExpenseEntryPresetsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(user_uuid: string, dto: CreateExpenseEntryPresetDto) {
    try {
      await validateExpenseRelations(this.prisma, user_uuid, dto);
      validatePresetRecurrence(dto);

      const { tag_uuids, ...presetFields } = dto;

      if (tag_uuids?.length) {
        await validateExpenseTags(this.prisma, user_uuid, tag_uuids);
      }

      const recurrenceFields = normalizePresetRecurrenceFields(presetFields);
      const recurrenceConfig = buildRecurrenceConfig(recurrenceFields);
      const next_run_at =
        recurrenceFields.is_recurring && recurrenceConfig
          ? getNextOccurrenceDate(recurrenceConfig, new Date(), true)
          : null;

      return await this.prisma.expenseEntryPreset.create({
        data: {
          user_uuid,
          title: presetFields.title,
          type: presetFields.type,
          amount: presetFields.amount,
          description: presetFields.description,
          from_account_uuid: presetFields.from_account_uuid,
          to_account_uuid: presetFields.to_account_uuid,
          category_uuid: presetFields.category_uuid,
          subcategory_uuid: presetFields.subcategory_uuid,
          ...recurrenceFields,
          next_run_at,
          ...(tag_uuids?.length ? { tags: { connect: tag_uuids.map((tagUuid) => ({ uuid: tagUuid })) } } : {}),
        },
        include: this.getPresetIncludes(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(`Failed to create expense entry preset: ${error.message}`);
      throw new InternalServerErrorException('Failed to create expense entry preset');
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.expenseEntryPreset.findMany({
        where: { user_uuid },
        include: this.getPresetIncludes(),
        orderBy: { created_at: 'asc' },
      });
    } catch (error) {
      this.logger.error(`Failed to get expense entry presets: ${error.message}`);
      throw new InternalServerErrorException('Failed to get expense entry presets');
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const preset = await this.prisma.expenseEntryPreset.findFirst({
        where: { uuid, user_uuid },
        include: this.getPresetIncludes(),
      });

      if (!preset) {
        throw new NotFoundException('Expense entry preset not found');
      }

      return preset;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get expense entry preset');
    }
  }

  async update(user_uuid: string, uuid: string, dto: UpdateExpenseEntryPresetDto) {
    try {
      const existing = await this.findOne(user_uuid, uuid);

      if (dto.from_account_uuid || dto.to_account_uuid || dto.category_uuid || dto.subcategory_uuid) {
        await validateExpenseRelations(this.prisma, user_uuid, dto);
      }

      const { tag_uuids, ...updateFields } = dto;

      if (tag_uuids?.length) {
        await validateExpenseTags(this.prisma, user_uuid, tag_uuids);
      }

      const recurrenceInput = {
        is_recurring: updateFields.is_recurring ?? existing.is_recurring,
        recurrence_frequency: updateFields.recurrence_frequency ?? existing.recurrence_frequency,
        recurrence_weekday: updateFields.recurrence_weekday ?? existing.recurrence_weekday,
        recurrence_day_of_month: updateFields.recurrence_day_of_month ?? existing.recurrence_day_of_month,
        recurrence_month: updateFields.recurrence_month ?? existing.recurrence_month,
      };

      const hasRecurrenceUpdate =
        updateFields.is_recurring !== undefined ||
        updateFields.recurrence_frequency !== undefined ||
        updateFields.recurrence_weekday !== undefined ||
        updateFields.recurrence_day_of_month !== undefined ||
        updateFields.recurrence_month !== undefined;

      let recurrenceData: Record<string, unknown> = {};

      if (hasRecurrenceUpdate) {
        validatePresetRecurrence(recurrenceInput);
        const normalized = normalizePresetRecurrenceFields(recurrenceInput);
        const recurrenceConfig = buildRecurrenceConfig(normalized);
        const next_run_at =
          normalized.is_recurring && recurrenceConfig
            ? getNextOccurrenceDate(recurrenceConfig, new Date(), true)
            : null;

        recurrenceData = {
          ...normalized,
          next_run_at,
        };
      }

      return await this.prisma.expenseEntryPreset.update({
        where: { uuid },
        data: {
          ...updateFields,
          ...recurrenceData,
          ...(tag_uuids !== undefined ? { tags: { set: tag_uuids.map((tagUuid) => ({ uuid: tagUuid })) } } : {}),
        },
        include: this.getPresetIncludes(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(`Failed to update expense entry preset: ${error.message}`);
      throw new InternalServerErrorException('Failed to update expense entry preset');
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.expenseEntryPreset.delete({ where: { uuid } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(`Failed to delete expense entry preset: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete expense entry preset');
    }
  }

  private getPresetIncludes() {
    return {
      from_account: true,
      to_account: true,
      category: true,
      subcategory: true,
      tags: true,
    };
  }
}
