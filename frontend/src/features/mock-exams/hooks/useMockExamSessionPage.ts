"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useMockExamBreadcrumbs } from "@/lib/breadcrumbs/use-breadcrumb-trails";
import {
  areAllQuestionsAnswered,
  buildFinishAnswers,
  countAnsweredQuestions,
  type ExamAnswers,
} from "../lib/exam-answers";
import { getElapsedSecondsSince } from "../lib/format-duration";
import { useFinishMockExam } from "./useFinishMockExam";
import { useMockExam } from "./useMockExams";
import { useExamTimer } from "./useExamTimer";

export function useMockExamSessionPage(examId: string) {
  const router = useRouter();
  const examQuery = useMockExam(examId);
  const finishMockExam = useFinishMockExam();

  const exam = examQuery.data;
  const isFinished = Boolean(exam?.finishedAt);
  const questions = exam?.questions ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswers>({});

  const elapsedSeconds = useExamTimer(exam?.startedAt ?? new Date().toISOString(), !isFinished);

  useMockExamBreadcrumbs({
    subject: exam?.subject
      ? { id: exam.subject.id, name: exam.subject.name }
      : null,
    examLabel: isFinished ? "Resultado" : "Simulado",
  });

  const currentQuestion = questions[currentIndex] ?? null;
  const answeredCount = useMemo(
    () => countAnsweredQuestions(questions, answers),
    [questions, answers],
  );
  const allAnswered = useMemo(
    () => areAllQuestionsAnswered(questions, answers),
    [questions, answers],
  );

  const handleSelectAlternative = useCallback(
    (alternativeId: string) => {
      if (!currentQuestion || isFinished) {
        return;
      }

      setAnswers((current) => ({
        ...current,
        [currentQuestion.questionId]: alternativeId,
      }));
    },
    [currentQuestion, isFinished],
  );

  const handlePrevious = useCallback(() => {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(questions.length - 1, index + 1));
  }, [questions.length]);

  const handleGoToQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleExit = useCallback(() => {
    router.push(routes.mockExams);
  }, [router]);

  const handleFinish = useCallback(() => {
    if (!exam || !allAnswered || finishMockExam.isPending) {
      return;
    }

    const duration = Math.max(1, getElapsedSecondsSince(exam.startedAt));

    finishMockExam.mutate({
      examId: exam.id,
      data: {
        answers: buildFinishAnswers(questions, answers),
        duration,
      },
    });
  }, [exam, allAnswered, finishMockExam, questions, answers]);

  const finishedExam = finishMockExam.data ?? (isFinished ? exam : null);

  return {
    examQuery,
    exam,
    finishedExam,
    isFinished: isFinished || Boolean(finishMockExam.data),
    isFinishing: finishMockExam.isPending,
    finishError: finishMockExam.error,
    currentIndex,
    currentQuestion,
    questions,
    answers,
    answeredCount,
    allAnswered,
    elapsedSeconds,
    handleSelectAlternative,
    handlePrevious,
    handleNext,
    handleGoToQuestion,
    handleFinish,
    handleExit,
  };
}
