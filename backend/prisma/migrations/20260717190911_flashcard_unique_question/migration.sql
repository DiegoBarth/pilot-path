/*
  Warnings:

  - A unique constraint covering the columns `[subject_id,question]` on the table `flashcards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "flashcards_subject_id_question_key" ON "flashcards"("subject_id", "question");
