/*
  Warnings:

  - You are about to drop the column `category_uuid` on the `expense_receipt_items` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory_uuid` on the `expense_receipt_items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "expense_receipt_items" DROP CONSTRAINT "expense_receipt_items_category_uuid_fkey";

-- DropForeignKey
ALTER TABLE "expense_receipt_items" DROP CONSTRAINT "expense_receipt_items_subcategory_uuid_fkey";

-- DropIndex
DROP INDEX "expense_receipt_items_category_uuid_idx";

-- DropIndex
DROP INDEX "expense_receipt_items_subcategory_uuid_idx";

-- AlterTable
ALTER TABLE "expense_receipt_items" DROP COLUMN "category_uuid",
DROP COLUMN "subcategory_uuid",
ADD COLUMN     "product_uuid" TEXT;

-- CreateTable
CREATE TABLE "expense_products" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "unit" TEXT,
    "size" DECIMAL(65,30),
    "category_uuid" TEXT,
    "subcategory_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expense_products_uuid_key" ON "expense_products"("uuid");

-- CreateIndex
CREATE INDEX "expense_products_user_uuid_idx" ON "expense_products"("user_uuid");

-- CreateIndex
CREATE INDEX "expense_products_category_uuid_idx" ON "expense_products"("category_uuid");

-- CreateIndex
CREATE INDEX "expense_products_subcategory_uuid_idx" ON "expense_products"("subcategory_uuid");

-- AddForeignKey
ALTER TABLE "expense_products" ADD CONSTRAINT "expense_products_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_products" ADD CONSTRAINT "expense_products_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "categories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_products" ADD CONSTRAINT "expense_products_subcategory_uuid_fkey" FOREIGN KEY ("subcategory_uuid") REFERENCES "subcategories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_receipt_items" ADD CONSTRAINT "expense_receipt_items_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "expense_products"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
