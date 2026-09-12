-- CreateEnum
CREATE TYPE "ProductSource" AS ENUM ('RECEIPTS', 'CONSUMPTION');

-- AlterTable
ALTER TABLE "expense_products" ADD COLUMN "source" "ProductSource" NOT NULL DEFAULT 'RECEIPTS';

-- CreateIndex
CREATE INDEX "expense_products_source_idx" ON "expense_products"("source");
