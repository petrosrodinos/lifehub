-- AlterTable
ALTER TABLE "expense_entries" ADD COLUMN "vat_period_month" INTEGER,
ADD COLUMN "vat_period_year" INTEGER;

-- CreateTable
CREATE TABLE "business_settings" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "vat_payment_category_uuid" TEXT,
    "vat_payment_subcategory_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_settings_uuid_key" ON "business_settings"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "business_settings_user_uuid_key" ON "business_settings"("user_uuid");

-- CreateIndex
CREATE INDEX "expense_entries_user_uuid_vat_period_year_vat_period_month_idx" ON "expense_entries"("user_uuid", "vat_period_year", "vat_period_month");

-- AddForeignKey
ALTER TABLE "business_settings" ADD CONSTRAINT "business_settings_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_settings" ADD CONSTRAINT "business_settings_vat_payment_category_uuid_fkey" FOREIGN KEY ("vat_payment_category_uuid") REFERENCES "categories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_settings" ADD CONSTRAINT "business_settings_vat_payment_subcategory_uuid_fkey" FOREIGN KEY ("vat_payment_subcategory_uuid") REFERENCES "subcategories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
