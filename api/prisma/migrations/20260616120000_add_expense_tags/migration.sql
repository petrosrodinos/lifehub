CREATE TABLE "expense_tags" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#8b5cf6',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_tags_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "_ExpenseEntryToExpenseTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExpenseEntryToExpenseTag_AB_pkey" PRIMARY KEY ("A","B")
);

CREATE UNIQUE INDEX "expense_tags_uuid_key" ON "expense_tags"("uuid");

CREATE INDEX "expense_tags_user_uuid_idx" ON "expense_tags"("user_uuid");

CREATE INDEX "_ExpenseEntryToExpenseTag_B_index" ON "_ExpenseEntryToExpenseTag"("B");

ALTER TABLE "expense_tags" ADD CONSTRAINT "expense_tags_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ExpenseEntryToExpenseTag" ADD CONSTRAINT "_ExpenseEntryToExpenseTag_A_fkey" FOREIGN KEY ("A") REFERENCES "expense_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ExpenseEntryToExpenseTag" ADD CONSTRAINT "_ExpenseEntryToExpenseTag_B_fkey" FOREIGN KEY ("B") REFERENCES "expense_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
