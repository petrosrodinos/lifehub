-- AlterTable
ALTER TABLE "chat_conversations" ADD COLUMN     "context" TEXT,
ADD COLUMN     "note_uuid" TEXT;

-- CreateIndex
CREATE INDEX "chat_conversations_user_uuid_note_uuid_idx" ON "chat_conversations"("user_uuid", "note_uuid");

-- AddForeignKey
ALTER TABLE "chat_conversations" ADD CONSTRAINT "chat_conversations_note_uuid_fkey" FOREIGN KEY ("note_uuid") REFERENCES "notes"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
