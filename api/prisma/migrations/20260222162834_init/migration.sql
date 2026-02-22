-- CreateTable
CREATE TABLE "expense_stores" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_receipts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "store_uuid" TEXT,
    "expense_entry_uuid" TEXT NOT NULL,
    "receipt_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_receipt_items" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "receipt_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL DEFAULT 1,
    "unit_price" DECIMAL(65,30) NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "category_uuid" TEXT,
    "subcategory_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_receipt_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expense_stores_uuid_key" ON "expense_stores"("uuid");

-- CreateIndex
CREATE INDEX "expense_stores_user_uuid_idx" ON "expense_stores"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "expense_receipts_uuid_key" ON "expense_receipts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "expense_receipts_expense_entry_uuid_key" ON "expense_receipts"("expense_entry_uuid");

-- CreateIndex
CREATE INDEX "expense_receipts_user_uuid_idx" ON "expense_receipts"("user_uuid");

-- CreateIndex
CREATE INDEX "expense_receipts_store_uuid_idx" ON "expense_receipts"("store_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "expense_receipt_items_uuid_key" ON "expense_receipt_items"("uuid");

-- CreateIndex
CREATE INDEX "expense_receipt_items_receipt_uuid_idx" ON "expense_receipt_items"("receipt_uuid");

-- CreateIndex
CREATE INDEX "expense_receipt_items_category_uuid_idx" ON "expense_receipt_items"("category_uuid");

-- CreateIndex
CREATE INDEX "expense_receipt_items_subcategory_uuid_idx" ON "expense_receipt_items"("subcategory_uuid");

-- AddForeignKey
ALTER TABLE "expense_stores" ADD CONSTRAINT "expense_stores_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_receipts" ADD CONSTRAINT "expense_receipts_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_receipts" ADD CONSTRAINT "expense_receipts_store_uuid_fkey" FOREIGN KEY ("store_uuid") REFERENCES "expense_stores"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_receipts" ADD CONSTRAINT "expense_receipts_expense_entry_uuid_fkey" FOREIGN KEY ("expense_entry_uuid") REFERENCES "expense_entries"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_receipt_items" ADD CONSTRAINT "expense_receipt_items_receipt_uuid_fkey" FOREIGN KEY ("receipt_uuid") REFERENCES "expense_receipts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_receipt_items" ADD CONSTRAINT "expense_receipt_items_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "categories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_receipt_items" ADD CONSTRAINT "expense_receipt_items_subcategory_uuid_fkey" FOREIGN KEY ("subcategory_uuid") REFERENCES "subcategories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
