-- CreateEnum
CREATE TYPE "ExpenseEntryType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER');

-- CreateTable
CREATE TABLE "expense_accounts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategories" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "category_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_entries" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "type" "ExpenseEntryType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "from_account_uuid" TEXT NOT NULL,
    "to_account_uuid" TEXT,
    "category_uuid" TEXT NOT NULL,
    "subcategory_uuid" TEXT NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expense_accounts_uuid_key" ON "expense_accounts"("uuid");

-- CreateIndex
CREATE INDEX "expense_accounts_user_uuid_idx" ON "expense_accounts"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "categories_uuid_key" ON "categories"("uuid");

-- CreateIndex
CREATE INDEX "categories_user_uuid_idx" ON "categories"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "subcategories_uuid_key" ON "subcategories"("uuid");

-- CreateIndex
CREATE INDEX "subcategories_category_uuid_idx" ON "subcategories"("category_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "expense_entries_uuid_key" ON "expense_entries"("uuid");

-- CreateIndex
CREATE INDEX "expense_entries_user_uuid_idx" ON "expense_entries"("user_uuid");

-- CreateIndex
CREATE INDEX "expense_entries_category_uuid_idx" ON "expense_entries"("category_uuid");

-- CreateIndex
CREATE INDEX "expense_entries_subcategory_uuid_idx" ON "expense_entries"("subcategory_uuid");

-- CreateIndex
CREATE INDEX "expense_entries_entry_date_idx" ON "expense_entries"("entry_date");

-- AddForeignKey
ALTER TABLE "expense_accounts" ADD CONSTRAINT "expense_accounts_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_entries" ADD CONSTRAINT "expense_entries_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_entries" ADD CONSTRAINT "expense_entries_from_account_uuid_fkey" FOREIGN KEY ("from_account_uuid") REFERENCES "expense_accounts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_entries" ADD CONSTRAINT "expense_entries_to_account_uuid_fkey" FOREIGN KEY ("to_account_uuid") REFERENCES "expense_accounts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_entries" ADD CONSTRAINT "expense_entries_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_entries" ADD CONSTRAINT "expense_entries_subcategory_uuid_fkey" FOREIGN KEY ("subcategory_uuid") REFERENCES "subcategories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
