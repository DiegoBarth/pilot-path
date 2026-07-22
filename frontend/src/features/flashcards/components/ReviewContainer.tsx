"use client";

import { useState } from "react";

import { ReviewHeader } from "./ReviewHeader";
import { Flashcard } from "./Flashcard";
import { FeedbackActions } from "./FeedbackActions";
import { ReviewSummary } from "./ReviewSummary";

interface MockFlashcard {
  id: string;
  subjectId: string;
  subjectName: string;
  question: string;
  answer: string;
}

interface ReviewContainerProps {
  subjectId?: string;
  subjectName?: string;
  onExit?: () => void;
}

const MOCK_FLASHCARDS: MockFlashcard[] = [
  {
    id: "fc-1",
    subjectId: "subject-flight-theory",
    subjectName: "Teoria de Voo",
    question: "O que é sustentação (Lift)?",
    answer:
      "É a força aerodinâmica que atua perpendicularmente ao vento relativo, opondo-se ao peso da aeronave.",
  },
  {
    id: "fc-2",
    subjectId: "subject-flight-theory",
    subjectName: "Teoria de Voo",
    question: "O que diz o Princípio de Bernoulli?",
    answer:
      "À medida que a velocidade de um fluido aumenta, a pressão estática exercida por esse fluido diminui.",
  },
  {
    id: "fc-3",
    subjectId: "subject-air-regulations",
    subjectName: "Regulamentos de Tráfego Aéreo",
    question:
      "Qual é o teto máximo de operação dentro de um Espaço Aéreo Classe G?",
    answer:
      "O espaço aéreo Classe G estende-se do solo até o limite inferior do espaço aéreo controlado subjacente.",
  },
  {
    id: "fc-4",
    subjectId: "subject-meteorology",
    subjectName: "Meteorologia",
    question: "O que significa METAR?",
    answer:
      "METAR é um informe meteorológico aeronáutico de rotina que descreve as condições meteorológicas observadas em um aeródromo.",
  },
];

export function ReviewContainer({
  subjectId,
  subjectName = "Todas as matérias",
  onExit,
}: ReviewContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [isFinished, setIsFinished] = useState(false);

  const cards = MOCK_FLASHCARDS.filter((card) => {
    if (!subjectId) {
      return true;
    }

    return card.subjectId === subjectId;
  });

  const currentCard = cards[currentIndex];

  const handleFeedback = (correct: boolean) => {
    if (!currentCard) {
      return;
    }

    if (correct) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= cards.length) {
      setIsFinished(true);
      return;
    }

    setIsFlipped(false);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, 200)
  };

  if (isFinished) {
    return (
      <ReviewSummary
        stats={{
          total: cards.length,
          correct: correctCount,
          wrong: wrongCount,
        }}
        onRestart={() => {
          setCurrentIndex(0);
          setCorrectCount(0);
          setWrongCount(0);
          setIsFlipped(false);
          setIsFinished(false);
        }}
        onExit={onExit ?? (() => { })}
      />
    );
  }

  if (!currentCard) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-400">
          Nenhum flashcard disponível para revisão.
        </p>

        <button
          type="button"
          onClick={onExit}
          className="mt-4 text-sm font-medium text-amber-400 hover:text-amber-300"
        >
          Voltar para Flashcards
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <ReviewHeader
        subtitle={subjectName}
        title="Revisão de Flashcards"
        reviewedToday={18}
        dailyGoal={50}
        sessionReviewed={currentIndex}
        sessionCorrect={correctCount}
        sessionTotal={cards.length}
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
          disabled={false}
        />
      )}
    </div>
  );
}