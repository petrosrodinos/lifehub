/*
  Warnings:

  - You are about to drop the column `exercise_uuid` on the `workout_sets` table. All the data in the column will be lost.
  - You are about to drop the column `workout_uuid` on the `workout_sets` table. All the data in the column will be lost.
  - Added the required column `workout_entry_uuid` to the `workout_sets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "workout_sets" DROP CONSTRAINT "workout_sets_exercise_uuid_fkey";

-- DropForeignKey
ALTER TABLE "workout_sets" DROP CONSTRAINT "workout_sets_workout_uuid_fkey";

-- AlterTable
ALTER TABLE "workout_sets" DROP COLUMN "exercise_uuid",
DROP COLUMN "workout_uuid",
ADD COLUMN     "workout_entry_uuid" TEXT NOT NULL,
ALTER COLUMN "order" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "workout_entries" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "workout_uuid" TEXT NOT NULL,
    "exercise_uuid" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workout_entries_uuid_key" ON "workout_entries"("uuid");

-- CreateIndex
CREATE INDEX "workout_entries_workout_uuid_idx" ON "workout_entries"("workout_uuid");

-- CreateIndex
CREATE INDEX "workout_entries_exercise_uuid_idx" ON "workout_entries"("exercise_uuid");

-- CreateIndex
CREATE INDEX "workout_sets_workout_entry_uuid_idx" ON "workout_sets"("workout_entry_uuid");

-- CreateIndex
CREATE INDEX "workout_sets_order_idx" ON "workout_sets"("order");

-- AddForeignKey
ALTER TABLE "workout_entries" ADD CONSTRAINT "workout_entries_workout_uuid_fkey" FOREIGN KEY ("workout_uuid") REFERENCES "workouts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_entries" ADD CONSTRAINT "workout_entries_exercise_uuid_fkey" FOREIGN KEY ("exercise_uuid") REFERENCES "exercises"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workout_entry_uuid_fkey" FOREIGN KEY ("workout_entry_uuid") REFERENCES "workout_entries"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
