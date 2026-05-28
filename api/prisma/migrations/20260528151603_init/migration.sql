-- CreateEnum
CREATE TYPE "QuizDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD', 'MIXED');

-- CreateEnum
CREATE TYPE "QuizQuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER');

-- CreateEnum
CREATE TYPE "QuizGroupStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'PARTIAL');

-- CreateEnum
CREATE TYPE "QuizAttemptStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateTable
CREATE TABLE "quiz_groups" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "user_title" TEXT,
    "ai_title" TEXT,
    "ai_description" TEXT,
    "status" "QuizGroupStatus" NOT NULL DEFAULT 'PENDING',
    "difficulty" "QuizDifficulty" NOT NULL DEFAULT 'MIXED',
    "question_count_target" INTEGER NOT NULL DEFAULT 10,
    "question_types" TEXT[],
    "total_questions" INTEGER NOT NULL DEFAULT 0,
    "source_note_uuids" TEXT[],
    "input_tokens" INTEGER NOT NULL DEFAULT 0,
    "output_tokens" INTEGER NOT NULL DEFAULT 0,
    "total_cost_usd" DECIMAL(10,6) NOT NULL DEFAULT 0,
    "error_message" TEXT,
    "ai_provider" TEXT,
    "ai_model" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "group_uuid" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "question_type" "QuizQuestionType" NOT NULL,
    "difficulty" "QuizDifficulty" NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "explanation" TEXT,
    "hint" TEXT,
    "source_note_uuid" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 1,
    "acceptable_answers" TEXT[],
    "grading_guidance" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_question_options" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "question_uuid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_question_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "group_uuid" TEXT NOT NULL,
    "status" "QuizAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "score" INTEGER NOT NULL DEFAULT 0,
    "max_score" INTEGER NOT NULL DEFAULT 0,
    "correct_answers" INTEGER NOT NULL DEFAULT 0,
    "incorrect_answers" INTEGER NOT NULL DEFAULT 0,
    "total_questions" INTEGER NOT NULL DEFAULT 0,
    "time_spent_seconds" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempt_answers" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "attempt_uuid" TEXT NOT NULL,
    "question_uuid" TEXT NOT NULL,
    "selected_option_uuid" TEXT,
    "boolean_answer" BOOLEAN,
    "text_answer" TEXT,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "points_awarded" INTEGER NOT NULL DEFAULT 0,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_attempt_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_groups_uuid_key" ON "quiz_groups"("uuid");

-- CreateIndex
CREATE INDEX "quiz_groups_user_uuid_idx" ON "quiz_groups"("user_uuid");

-- CreateIndex
CREATE INDEX "quiz_groups_user_uuid_status_idx" ON "quiz_groups"("user_uuid", "status");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_questions_uuid_key" ON "quiz_questions"("uuid");

-- CreateIndex
CREATE INDEX "quiz_questions_group_uuid_idx" ON "quiz_questions"("group_uuid");

-- CreateIndex
CREATE INDEX "quiz_questions_group_uuid_order_index_idx" ON "quiz_questions"("group_uuid", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_question_options_uuid_key" ON "quiz_question_options"("uuid");

-- CreateIndex
CREATE INDEX "quiz_question_options_question_uuid_idx" ON "quiz_question_options"("question_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_attempts_uuid_key" ON "quiz_attempts"("uuid");

-- CreateIndex
CREATE INDEX "quiz_attempts_user_uuid_idx" ON "quiz_attempts"("user_uuid");

-- CreateIndex
CREATE INDEX "quiz_attempts_group_uuid_idx" ON "quiz_attempts"("group_uuid");

-- CreateIndex
CREATE INDEX "quiz_attempts_user_uuid_group_uuid_idx" ON "quiz_attempts"("user_uuid", "group_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_attempt_answers_uuid_key" ON "quiz_attempt_answers"("uuid");

-- CreateIndex
CREATE INDEX "quiz_attempt_answers_attempt_uuid_idx" ON "quiz_attempt_answers"("attempt_uuid");

-- CreateIndex
CREATE INDEX "quiz_attempt_answers_question_uuid_idx" ON "quiz_attempt_answers"("question_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_attempt_answers_attempt_uuid_question_uuid_key" ON "quiz_attempt_answers"("attempt_uuid", "question_uuid");

-- AddForeignKey
ALTER TABLE "quiz_groups" ADD CONSTRAINT "quiz_groups_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "quiz_groups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_question_options" ADD CONSTRAINT "quiz_question_options_question_uuid_fkey" FOREIGN KEY ("question_uuid") REFERENCES "quiz_questions"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "quiz_groups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_answers" ADD CONSTRAINT "quiz_attempt_answers_attempt_uuid_fkey" FOREIGN KEY ("attempt_uuid") REFERENCES "quiz_attempts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_answers" ADD CONSTRAINT "quiz_attempt_answers_question_uuid_fkey" FOREIGN KEY ("question_uuid") REFERENCES "quiz_questions"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
