"use client";

import { useMemo, useRef, useState } from "react";
import { ReviewHeader } from "./ReviewHeader";
import { Flashcard } from "./Flashcard";
import { FeedbackActions } from "./FeedbackActions";
import { ReviewSummary } from "./ReviewSummary";
import { FlashcardsBackLink } from "./FlashcardsBackLink";
import { useSubmitFlashcardReview } from "../hooks/useSubmitFlashcardReview";
import { useCreateStudySessionBySubject } from "@/features/study/hooks/useCreateStudySessionBySubject";
import { buildSessionStats } from "../lib/session-stats";
import type { FlashcardReviewCard } from "../types";
import type { FlashcardSessionContext } from "../lib/session-context";
import type { Mood } from "@/domain/mood";

interface ReviewContainerProps {
  cards: FlashcardReviewCard[];
  sessionContext: FlashcardSessionContext | null;
  subjectName?: string;
  reviewedTodayBaseline?: number;
  dailyGoal?: number;
  onSessionSaved?: () => void;
  onExit?: () => void;
}

export function ReviewContainer({
  cards,
  sessionContext,
  subjectName = "Todas as matérias",
  reviewedTodayBaseline = 0,
  dailyGoal = 0,
  onSessionSaved,
  onExit,
}: ReviewContainerProps) {
  const submitReview = useSubmitFlashcardReview();
  const createStudySession = useCreateStudySessionBySubject();
  const sessionStartedAt = useRef(new Date().toISOString());
  const totalCards = cards.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const currentCard = cards[currentIndex];
  const completedCount = correctCount + wrongCount;

  const sessionStats = useMemo(
    () => buildSessionStats(totalCards, correctCount, wrongCount),
    [totalCards, correctCount, wrongCount],
  );

  const handleFeedback = async (correct: boolean) => {
    if (!currentCard || submitReview.isPending) {
      return;
    }

    try {
      await submitReview.mutateAsync({
        flashcardId: currentCard.id,
        payload: { correct },
      });

      if (correct) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setWrongCount((prev) => prev + 1);
      }

      const nextIndex = currentIndex + 1;

      if (nextIndex >= totalCards) {
        setIsFinished(true);
        return;
      }

      setIsFlipped(false);

      setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, 200);
    } catch {
      // Mantém o card atual para o usuário tentar novamente.
    }
  };

  const handleSaveSession = async (mood: Mood) => {
    if (!sessionContext) {
      throw new Error("Contexto da sessão indisponível.");
    }

    setSaveError(null);

    const startedAt = new Date(sessionStartedAt.current);
    const endedAt = new Date();

    if (endedAt <= startedAt) {
      endedAt.setSeconds(startedAt.getSeconds() + 1);
    }

    try {
      await createStudySession.mutateAsync({
        subjectId: sessionContext.subjectId,
        certificationId: sessionContext.certificationId,
        startedAt: startedAt.toISOString(),
        endedAt: endedAt.toISOString(),
        studyType: "FLASHCARDS",
        mood,
        notes: `${sessionStats.total} flashcards revisados, ${sessionStats.correct} acertos e ${sessionStats.wrong} erros.`,
      });

      onSessionSaved?.();
    } catch {
      setSaveError(
        "Não foi possível salvar a sessão. Verifique sua matrícula e tente novamente.",
      );
      throw new Error("save failed");
    }
  };

  const handleRestart = () => {
    sessionStartedAt.current = new Date().toISOString();
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFlipped(false);
    setIsFinished(false);
    setSaveError(null);
  };

  if (isFinished) {
    return (
      <ReviewSummary
        stats={sessionStats}
        canSaveSession={Boolean(sessionContext)}
        isSaving={createStudySession.isPending}
        saveError={saveError}
        onSaveSession={handleSaveSession}
        onRestart={handleRestart}
        onExit={onExit ?? (() => {})}
      />
    );
  }

  if (!currentCard) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-400">
          Nenhum flashcard disponível para revisão no momento.
        </p>
        <FlashcardsBackLink onClick={onExit} className="mt-4" />
      </div>
    );
  }

  const goal = dailyGoal > 0 ? dailyGoal : totalCards;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <ReviewHeader
        subtitle={subjectName}
        reviewedToday={reviewedTodayBaseline + completedCount}
        dailyGoal={goal}
        sessionReviewed={completedCount}
        sessionCorrect={correctCount}
        sessionTotal={totalCards}
        onExit={onExit}
      />

      <Flashcard
        question={currentCard.question}
        answer={currentCard.answer}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped((prev) => !prev)}
      />

      {isFlipped && (
        <FeedbackActions
          onFeedback={handleFeedback}
          disabled={submitReview.isPending}
        />
      )}
    </div>
  );
}
