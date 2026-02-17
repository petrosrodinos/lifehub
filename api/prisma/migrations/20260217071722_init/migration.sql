-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('REPS', 'TIME');

-- CreateTable
CREATE TABLE "muscle_groups" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "muscle_group_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "ExerciseType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "name" TEXT,
    "notes" TEXT,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sets" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "workout_uuid" TEXT NOT NULL,
    "exercise_uuid" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "reps" INTEGER,
    "weight" DECIMAL(65,30),
    "duration_seconds" INTEGER,
    "distance_meters" INTEGER,
    "reset_seconds" INTEGER,
    "notes" TEXT,
    "is_dropset" BOOLEAN NOT NULL DEFAULT false,
    "is_amrap" BOOLEAN NOT NULL DEFAULT false,
    "is_rest" BOOLEAN NOT NULL DEFAULT false,
    "is_warmup" BOOLEAN NOT NULL DEFAULT false,
    "is_cooldown" BOOLEAN NOT NULL DEFAULT false,
    "is_super_set" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_sets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "muscle_groups_uuid_key" ON "muscle_groups"("uuid");

-- CreateIndex
CREATE INDEX "muscle_groups_user_uuid_idx" ON "muscle_groups"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "exercises_uuid_key" ON "exercises"("uuid");

-- CreateIndex
CREATE INDEX "exercises_user_uuid_idx" ON "exercises"("user_uuid");

-- CreateIndex
CREATE INDEX "exercises_muscle_group_uuid_idx" ON "exercises"("muscle_group_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "workouts_uuid_key" ON "workouts"("uuid");

-- CreateIndex
CREATE INDEX "workouts_user_uuid_idx" ON "workouts"("user_uuid");

-- CreateIndex
CREATE INDEX "workouts_started_at_idx" ON "workouts"("started_at");

-- CreateIndex
CREATE UNIQUE INDEX "workout_sets_uuid_key" ON "workout_sets"("uuid");

-- AddForeignKey
ALTER TABLE "muscle_groups" ADD CONSTRAINT "muscle_groups_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscle_group_uuid_fkey" FOREIGN KEY ("muscle_group_uuid") REFERENCES "muscle_groups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workout_uuid_fkey" FOREIGN KEY ("workout_uuid") REFERENCES "workouts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_exercise_uuid_fkey" FOREIGN KEY ("exercise_uuid") REFERENCES "exercises"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
