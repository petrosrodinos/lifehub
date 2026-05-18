-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('BOOK', 'IDEA', 'NOTE', 'VIDEO', 'ARTICLE');

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "type" "NoteType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "vector_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_uuid_key" ON "notes"("uuid");

-- CreateIndex
CREATE INDEX "notes_user_uuid_idx" ON "notes"("user_uuid");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
