-- CreateEnum
CREATE TYPE "ProductTrackingMethod" AS ENUM ('START_FINISH', 'QUANTITY_DOSE');

-- CreateEnum
CREATE TYPE "ProductPurchaseStatus" AS ENUM ('NOT_STARTED', 'ACTIVE', 'FINISHED', 'PAUSED', 'DISCARDED');

-- CreateTable
CREATE TABLE "product_purchases" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "product_uuid" TEXT NOT NULL,
    "expense_entry_uuid" TEXT,
    "tracking_method" "ProductTrackingMethod" NOT NULL,
    "status" "ProductPurchaseStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "purchase_price" DECIMAL(65,30) NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3),
    "actual_finish_date" TIMESTAMP(3),
    "total_units" DECIMAL(65,30),
    "unit_label" TEXT,
    "consumption_amount" DECIMAL(65,30),
    "consumption_period_days" INTEGER DEFAULT 1,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_purchases_uuid_key" ON "product_purchases"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "product_purchases_expense_entry_uuid_key" ON "product_purchases"("expense_entry_uuid");

-- CreateIndex
CREATE INDEX "product_purchases_user_uuid_idx" ON "product_purchases"("user_uuid");

-- CreateIndex
CREATE INDEX "product_purchases_product_uuid_idx" ON "product_purchases"("product_uuid");

-- CreateIndex
CREATE INDEX "product_purchases_status_idx" ON "product_purchases"("status");

-- AddForeignKey
ALTER TABLE "product_purchases" ADD CONSTRAINT "product_purchases_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_purchases" ADD CONSTRAINT "product_purchases_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "expense_products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_purchases" ADD CONSTRAINT "product_purchases_expense_entry_uuid_fkey" FOREIGN KEY ("expense_entry_uuid") REFERENCES "expense_entries"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
