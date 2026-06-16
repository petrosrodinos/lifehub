CREATE TABLE "expense_entry_presets" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ExpenseEntryType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "from_account_uuid" TEXT NOT NULL,
    "to_account_uuid" TEXT,
    "category_uuid" TEXT,
    "subcategory_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_entry_presets_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "_ExpenseEntryPresetToExpenseTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExpenseEntryPresetToExpenseTag_AB_pkey" PRIMARY KEY ("A","B")
);

CREATE UNIQUE INDEX "expense_entry_presets_uuid_key" ON "expense_entry_presets"("uuid");

CREATE INDEX "expense_entry_presets_user_uuid_idx" ON "expense_entry_presets"("user_uuid");

CREATE INDEX "expense_entry_presets_category_uuid_idx" ON "expense_entry_presets"("category_uuid");

CREATE INDEX "expense_entry_presets_subcategory_uuid_idx" ON "expense_entry_presets"("subcategory_uuid");

CREATE INDEX "_ExpenseEntryPresetToExpenseTag_B_index" ON "_ExpenseEntryPresetToExpenseTag"("B");

ALTER TABLE "expense_entry_presets" ADD CONSTRAINT "expense_entry_presets_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "expense_entry_presets" ADD CONSTRAINT "expense_entry_presets_from_account_uuid_fkey" FOREIGN KEY ("from_account_uuid") REFERENCES "expense_accounts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "expense_entry_presets" ADD CONSTRAINT "expense_entry_presets_to_account_uuid_fkey" FOREIGN KEY ("to_account_uuid") REFERENCES "expense_accounts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "expense_entry_presets" ADD CONSTRAINT "expense_entry_presets_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "expense_entry_presets" ADD CONSTRAINT "expense_entry_presets_subcategory_uuid_fkey" FOREIGN KEY ("subcategory_uuid") REFERENCES "subcategories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ExpenseEntryPresetToExpenseTag" ADD CONSTRAINT "_ExpenseEntryPresetToExpenseTag_A_fkey" FOREIGN KEY ("A") REFERENCES "expense_entry_presets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ExpenseEntryPresetToExpenseTag" ADD CONSTRAINT "_ExpenseEntryPresetToExpenseTag_B_fkey" FOREIGN KEY ("B") REFERENCES "expense_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
