-- CreateEnum
CREATE TYPE "ScheduleDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_slots" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "activity_uuid" TEXT NOT NULL,
    "day" "ScheduleDay" NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activities_uuid_key" ON "activities"("uuid");

-- CreateIndex
CREATE INDEX "activities_uuid_idx" ON "activities"("uuid");

-- CreateIndex
CREATE INDEX "activities_user_uuid_idx" ON "activities"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_slots_uuid_key" ON "schedule_slots"("uuid");

-- CreateIndex
CREATE INDEX "schedule_slots_uuid_idx" ON "schedule_slots"("uuid");

-- CreateIndex
CREATE INDEX "schedule_slots_user_uuid_idx" ON "schedule_slots"("user_uuid");

-- CreateIndex
CREATE INDEX "schedule_slots_day_idx" ON "schedule_slots"("day");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_slots" ADD CONSTRAINT "schedule_slots_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_slots" ADD CONSTRAINT "schedule_slots_activity_uuid_fkey" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
