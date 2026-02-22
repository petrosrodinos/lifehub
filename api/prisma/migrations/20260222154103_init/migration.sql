-- AlterTable
ALTER TABLE "expense_entries" ALTER COLUMN "category_uuid" DROP NOT NULL,
ALTER COLUMN "subcategory_uuid" DROP NOT NULL;
