/*
  Warnings:

  - You are about to drop the column `reset_seconds` on the `workout_sets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "workout_sets" DROP COLUMN "reset_seconds",
ADD COLUMN     "rest_seconds" INTEGER;
