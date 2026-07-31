-- CreateEnum
CREATE TYPE "ExpenseRecurrenceFrequency" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "expense_entry_presets"
ADD COLUMN "is_recurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "recurrence_frequency" "ExpenseRecurrenceFrequency",
ADD COLUMN "recurrence_weekday" INTEGER,
ADD COLUMN "recurrence_day_of_month" INTEGER,
ADD COLUMN "recurrence_month" INTEGER,
ADD COLUMN "next_run_at" TIMESTAMP(3),
ADD COLUMN "last_run_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "expense_entries" ADD COLUMN "preset_uuid" TEXT;

-- CreateIndex
CREATE INDEX "expense_entry_presets_is_recurring_next_run_at_idx" ON "expense_entry_presets"("is_recurring", "next_run_at");

-- CreateIndex
CREATE INDEX "expense_entries_preset_uuid_idx" ON "expense_entries"("preset_uuid");

-- AddForeignKey
ALTER TABLE "expense_entries" ADD CONSTRAINT "expense_entries_preset_uuid_fkey" FOREIGN KEY ("preset_uuid") REFERENCES "expense_entry_presets"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
