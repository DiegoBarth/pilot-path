-- CreateTable
CREATE TABLE "user_flashcards" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "flashcard_id" UUID NOT NULL,
    "correct_count" INTEGER NOT NULL DEFAULT 0,
    "wrong_count" INTEGER NOT NULL DEFAULT 0,
    "last_reviewed_at" TIMESTAMP(3),
    "next_review_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_flashcards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flashcard_reviews" (
    "id" UUID NOT NULL,
    "user_flashcard_id" UUID NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "reviewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flashcard_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_flashcards_user_id_idx" ON "user_flashcards"("user_id");

-- CreateIndex
CREATE INDEX "user_flashcards_flashcard_id_idx" ON "user_flashcards"("flashcard_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_flashcards_user_id_flashcard_id_key" ON "user_flashcards"("user_id", "flashcard_id");

-- CreateIndex
CREATE INDEX "flashcard_reviews_user_flashcard_id_idx" ON "flashcard_reviews"("user_flashcard_id");

-- AddForeignKey
ALTER TABLE "user_flashcards" ADD CONSTRAINT "user_flashcards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_flashcards" ADD CONSTRAINT "user_flashcards_flashcard_id_fkey" FOREIGN KEY ("flashcard_id") REFERENCES "flashcards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcard_reviews" ADD CONSTRAINT "flashcard_reviews_user_flashcard_id_fkey" FOREIGN KEY ("user_flashcard_id") REFERENCES "user_flashcards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
