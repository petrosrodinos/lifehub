/*
  Warnings:

  - You are about to drop the column `is_default` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `is_default` on the `schedule_slots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "is_default";

-- AlterTable
ALTER TABLE "schedule_slots" DROP COLUMN "is_default";
