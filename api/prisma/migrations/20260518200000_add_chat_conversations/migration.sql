CREATE TYPE "ChatMessageRole" AS ENUM ('USER', 'ASSISTANT', 'TOOL');

CREATE TABLE "chat_conversations" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New chat',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_conversations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "chat_messages" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "conversation_uuid" TEXT NOT NULL,
    "role" "ChatMessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "chat_conversations_uuid_key" ON "chat_conversations"("uuid");

CREATE INDEX "chat_conversations_user_uuid_updated_at_idx" ON "chat_conversations"("user_uuid", "updated_at");

CREATE UNIQUE INDEX "chat_messages_uuid_key" ON "chat_messages"("uuid");

CREATE INDEX "chat_messages_conversation_uuid_created_at_idx" ON "chat_messages"("conversation_uuid", "created_at");

ALTER TABLE "chat_conversations" ADD CONSTRAINT "chat_conversations_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_conversation_uuid_fkey" FOREIGN KEY ("conversation_uuid") REFERENCES "chat_conversations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
