import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { ExpenseEntryPreset, ExpenseTag } from '@/generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ExpenseEntriesService } from '../expense-entries/expense-entries.service';
import { buildRecurrenceConfig, getNextOccurrenceDate } from '../utils/preset-recurrence.helper';

type RecurringPreset = ExpenseEntryPreset & { tags: ExpenseTag[] };

@Injectable()
export class ExpensePresetRecurrenceJobsService {
  private readonly logger = new Logger(ExpensePresetRecurrenceJobsService.name);
  private readonly maxCatchUpRuns = 36;

  constructor(
    private readonly prisma: PrismaService,
    private readonly expenseEntriesService: ExpenseEntriesService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async processRecurringPresets() {
    const todayEnd = DateTime.utc().endOf('day').toJSDate();

    const duePresets = await this.prisma.expenseEntryPreset.findMany({
      where: {
        is_recurring: true,
        next_run_at: { lte: todayEnd },
      },
      include: { tags: true },
    });

    this.logger.log(`Processing ${duePresets.length} recurring expense presets`);

    for (const preset of duePresets) {
      try {
        await this.processPreset(preset);
      } catch (error) {
        this.logger.error(`Failed to process recurring preset ${preset.uuid}: ${error.message}`);
      }
    }
  }

  private async processPreset(preset: RecurringPreset) {
    const config = buildRecurrenceConfig(preset);

    if (!config || !preset.next_run_at) {
      return;
    }

    let nextRunAt = DateTime.fromJSDate(preset.next_run_at, { zone: 'utc' }).startOf('day');
    const today = DateTime.utc().startOf('day');
    let lastRunAt: Date | null = preset.last_run_at;
    let runs = 0;

    while (nextRunAt <= today && runs < this.maxCatchUpRuns) {
      const entryDate = nextRunAt.toJSDate();
      const alreadyExists = await this.hasEntryForDate(preset.uuid, entryDate);

      if (!alreadyExists) {
        await this.expenseEntriesService.create(preset.user_uuid, {
          type: preset.type,
          amount: Number(preset.amount),
          description: preset.description ?? undefined,
          from_account_uuid: preset.from_account_uuid,
          to_account_uuid: preset.to_account_uuid ?? undefined,
          category_uuid: preset.category_uuid ?? undefined,
          subcategory_uuid: preset.subcategory_uuid ?? undefined,
          entry_date: entryDate.toISOString(),
          preset_uuid: preset.uuid,
          tag_uuids: preset.tags.map((tag) => tag.uuid),
        });
      }

      lastRunAt = entryDate;
      nextRunAt = DateTime.fromJSDate(getNextOccurrenceDate(config, entryDate, false), { zone: 'utc' }).startOf('day');
      runs += 1;
    }

    await this.prisma.expenseEntryPreset.update({
      where: { uuid: preset.uuid },
      data: {
        last_run_at: lastRunAt,
        next_run_at: nextRunAt.toJSDate(),
      },
    });
  }

  private async hasEntryForDate(presetUuid: string, entryDate: Date): Promise<boolean> {
    const dayStart = DateTime.fromJSDate(entryDate, { zone: 'utc' }).startOf('day').toJSDate();
    const dayEnd = DateTime.fromJSDate(entryDate, { zone: 'utc' }).endOf('day').toJSDate();

    const existing = await this.prisma.expenseEntry.findFirst({
      where: {
        preset_uuid: presetUuid,
        entry_date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      select: { uuid: true },
    });

    return !!existing;
  }
}
