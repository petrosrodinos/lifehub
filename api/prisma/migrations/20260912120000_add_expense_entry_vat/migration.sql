-- AlterTable
ALTER TABLE "expense_entries" ADD COLUMN "has_vat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "vat_amount" DECIMAL(65,30);
