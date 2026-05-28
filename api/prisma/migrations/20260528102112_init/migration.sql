-- CreateEnum
CREATE TYPE "FlashCardGroupStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'PARTIAL');

-- CreateTable
CREATE TABLE "flash_card_groups" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "user_title" TEXT,
    "ai_title" TEXT,
    "status" "FlashCardGroupStatus" NOT NULL DEFAULT 'PENDING',
    "source_note_uuids" TEXT[],
    "total_cards" INTEGER NOT NULL DEFAULT 0,
    "completed_cards" INTEGER NOT NULL DEFAULT 0,
    "failed_cards" INTEGER NOT NULL DEFAULT 0,
    "input_tokens" INTEGER NOT NULL DEFAULT 0,
    "output_tokens" INTEGER NOT NULL DEFAULT 0,
    "total_cost_usd" DECIMAL(10,6) NOT NULL DEFAULT 0,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flash_card_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash_cards" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "group_uuid" TEXT NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "keywords" TEXT[],
    "ai_image_prompt" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flash_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash_card_images" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "card_uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "gcs_path" TEXT NOT NULL,
    "gcs_bucket" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "content_type" TEXT NOT NULL DEFAULT 'image/png',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flash_card_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "flash_card_groups_uuid_key" ON "flash_card_groups"("uuid");

-- CreateIndex
CREATE INDEX "flash_card_groups_user_uuid_idx" ON "flash_card_groups"("user_uuid");

-- CreateIndex
CREATE INDEX "flash_card_groups_user_uuid_status_idx" ON "flash_card_groups"("user_uuid", "status");

-- CreateIndex
CREATE UNIQUE INDEX "flash_cards_uuid_key" ON "flash_cards"("uuid");

-- CreateIndex
CREATE INDEX "flash_cards_group_uuid_idx" ON "flash_cards"("group_uuid");

-- CreateIndex
CREATE INDEX "flash_cards_group_uuid_order_index_idx" ON "flash_cards"("group_uuid", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "flash_card_images_uuid_key" ON "flash_card_images"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "flash_card_images_card_uuid_key" ON "flash_card_images"("card_uuid");

-- AddForeignKey
ALTER TABLE "flash_card_groups" ADD CONSTRAINT "flash_card_groups_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash_cards" ADD CONSTRAINT "flash_cards_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "flash_card_groups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash_card_images" ADD CONSTRAINT "flash_card_images_card_uuid_fkey" FOREIGN KEY ("card_uuid") REFERENCES "flash_cards"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
