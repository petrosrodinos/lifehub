-- CreateEnum
CREATE TYPE "ActivityRepeatType" AS ENUM ('DAILY', 'WEEKDAYS', 'INTERVAL', 'DATES', 'FREQUENCY');

-- CreateEnum
CREATE TYPE "ActivityTargetType" AS ENUM ('BOOLEAN', 'QUANTITY');

-- CreateEnum
CREATE TYPE "ActivityTargetUnit" AS ENUM ('PAGES', 'MINUTES', 'KM', 'TIMES', 'CUSTOM');

-- CreateEnum
CREATE TYPE "FrequencyPeriod" AS ENUM ('WEEK', 'MONTH');

-- CreateEnum
CREATE TYPE "OccurrenceStatus" AS ENUM ('PENDING', 'COMPLETED', 'SKIPPED', 'FAILED');

-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "color" DROP NOT NULL;

-- CreateTable
CREATE TABLE "activity_schedules" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "activity_uuid" TEXT NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid_until" TIMESTAMP(3),
    "repeat_type" "ActivityRepeatType" NOT NULL,
    "interval_days" INTEGER,
    "time_of_day" TEXT,
    "frequency_value" INTEGER,
    "frequency_period" "FrequencyPeriod",
    "target_type" "ActivityTargetType" NOT NULL,
    "target_value" DOUBLE PRECISION,
    "target_unit" "ActivityTargetUnit",
    "target_unit_label" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_schedule_weekdays" (
    "id" SERIAL NOT NULL,
    "schedule_uuid" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,

    CONSTRAINT "activity_schedule_weekdays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_schedule_dates" (
    "id" SERIAL NOT NULL,
    "schedule_uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_schedule_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_occurrences" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "activity_uuid" TEXT NOT NULL,
    "schedule_uuid" TEXT NOT NULL,
    "scheduled_for" TIMESTAMP(3) NOT NULL,
    "status" "OccurrenceStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_occurrences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "activity_uuid" TEXT NOT NULL,
    "schedule_uuid" TEXT NOT NULL,
    "occurrence_uuid" TEXT NOT NULL,
    "snapshot_target_type" "ActivityTargetType" NOT NULL,
    "snapshot_target_value" DOUBLE PRECISION,
    "snapshot_target_unit" "ActivityTargetUnit",
    "snapshot_target_unit_label" TEXT,
    "value" DOUBLE PRECISION,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "skipped" BOOLEAN NOT NULL DEFAULT false,
    "skip_reason" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activity_schedules_uuid_key" ON "activity_schedules"("uuid");

-- CreateIndex
CREATE INDEX "activity_schedules_activity_uuid_idx" ON "activity_schedules"("activity_uuid");

-- CreateIndex
CREATE INDEX "activity_schedules_user_uuid_idx" ON "activity_schedules"("user_uuid");

-- CreateIndex
CREATE INDEX "activity_schedules_valid_from_idx" ON "activity_schedules"("valid_from");

-- CreateIndex
CREATE UNIQUE INDEX "activity_schedule_weekdays_schedule_uuid_weekday_key" ON "activity_schedule_weekdays"("schedule_uuid", "weekday");

-- CreateIndex
CREATE UNIQUE INDEX "activity_schedule_dates_schedule_uuid_date_key" ON "activity_schedule_dates"("schedule_uuid", "date");

-- CreateIndex
CREATE UNIQUE INDEX "activity_occurrences_uuid_key" ON "activity_occurrences"("uuid");

-- CreateIndex
CREATE INDEX "activity_occurrences_user_uuid_scheduled_for_idx" ON "activity_occurrences"("user_uuid", "scheduled_for");

-- CreateIndex
CREATE INDEX "activity_occurrences_activity_uuid_idx" ON "activity_occurrences"("activity_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "activity_occurrences_schedule_uuid_scheduled_for_key" ON "activity_occurrences"("schedule_uuid", "scheduled_for");

-- CreateIndex
CREATE UNIQUE INDEX "activity_logs_uuid_key" ON "activity_logs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "activity_logs_occurrence_uuid_key" ON "activity_logs"("occurrence_uuid");

-- CreateIndex
CREATE INDEX "activity_logs_user_uuid_idx" ON "activity_logs"("user_uuid");

-- CreateIndex
CREATE INDEX "activity_logs_activity_uuid_idx" ON "activity_logs"("activity_uuid");

-- CreateIndex
CREATE INDEX "activity_logs_completed_at_idx" ON "activity_logs"("completed_at");

-- CreateIndex
CREATE INDEX "activity_logs_schedule_uuid_idx" ON "activity_logs"("schedule_uuid");

-- AddForeignKey
ALTER TABLE "activity_schedules" ADD CONSTRAINT "activity_schedules_activity_uuid_fkey" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_schedules" ADD CONSTRAINT "activity_schedules_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_schedule_weekdays" ADD CONSTRAINT "activity_schedule_weekdays_schedule_uuid_fkey" FOREIGN KEY ("schedule_uuid") REFERENCES "activity_schedules"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_schedule_dates" ADD CONSTRAINT "activity_schedule_dates_schedule_uuid_fkey" FOREIGN KEY ("schedule_uuid") REFERENCES "activity_schedules"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_occurrences" ADD CONSTRAINT "activity_occurrences_activity_uuid_fkey" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_occurrences" ADD CONSTRAINT "activity_occurrences_schedule_uuid_fkey" FOREIGN KEY ("schedule_uuid") REFERENCES "activity_schedules"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_occurrences" ADD CONSTRAINT "activity_occurrences_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_activity_uuid_fkey" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_schedule_uuid_fkey" FOREIGN KEY ("schedule_uuid") REFERENCES "activity_schedules"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_occurrence_uuid_fkey" FOREIGN KEY ("occurrence_uuid") REFERENCES "activity_occurrences"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
