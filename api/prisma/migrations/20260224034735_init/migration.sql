-- CreateTable
CREATE TABLE "HiddenActivity" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "activity_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HiddenActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_hidden_categories" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "category_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_hidden_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_hidden_subcategories" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "subcategory_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_hidden_subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HiddenActivity_uuid_key" ON "HiddenActivity"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "expense_hidden_categories_uuid_key" ON "expense_hidden_categories"("uuid");

-- CreateIndex
CREATE INDEX "expense_hidden_categories_user_uuid_idx" ON "expense_hidden_categories"("user_uuid");

-- CreateIndex
CREATE INDEX "expense_hidden_categories_category_uuid_idx" ON "expense_hidden_categories"("category_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "expense_hidden_subcategories_uuid_key" ON "expense_hidden_subcategories"("uuid");

-- CreateIndex
CREATE INDEX "expense_hidden_subcategories_user_uuid_idx" ON "expense_hidden_subcategories"("user_uuid");

-- CreateIndex
CREATE INDEX "expense_hidden_subcategories_subcategory_uuid_idx" ON "expense_hidden_subcategories"("subcategory_uuid");

-- AddForeignKey
ALTER TABLE "HiddenActivity" ADD CONSTRAINT "HiddenActivity_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiddenActivity" ADD CONSTRAINT "HiddenActivity_activity_uuid_fkey" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_hidden_categories" ADD CONSTRAINT "expense_hidden_categories_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_hidden_categories" ADD CONSTRAINT "expense_hidden_categories_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_hidden_subcategories" ADD CONSTRAINT "expense_hidden_subcategories_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_hidden_subcategories" ADD CONSTRAINT "expense_hidden_subcategories_subcategory_uuid_fkey" FOREIGN KEY ("subcategory_uuid") REFERENCES "subcategories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
