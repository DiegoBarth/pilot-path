-- CreateTable
CREATE TABLE "user_questions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "selected_alternative_id" UUID NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "response_time" INTEGER NOT NULL,
    "answered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_questions_user_id_idx" ON "user_questions"("user_id");

-- CreateIndex
CREATE INDEX "user_questions_question_id_idx" ON "user_questions"("question_id");

-- AddForeignKey
ALTER TABLE "user_questions" ADD CONSTRAINT "user_questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_questions" ADD CONSTRAINT "user_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_questions" ADD CONSTRAINT "user_questions_selected_alternative_id_fkey" FOREIGN KEY ("selected_alternative_id") REFERENCES "question_alternatives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
