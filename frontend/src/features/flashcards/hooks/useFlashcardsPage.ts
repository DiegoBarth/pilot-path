"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCertificationSubjects } from "@/features/certifications/api/certifications.api";
import { filterActiveEnrollments } from "@/features/enrollments/lib/utils";
import { useEnrollments } from "@/features/enrollments/hooks/useEnrollments";
import { useFlashcardReviewBreadcrumbs } from "@/hooks/use-breadcrumb-trails";
import { queryKeys, invalidateFlashcardSessionQueries, invalidateStudyHistoryQueries } from "@/lib/query-keys";
import { getFlashcards } from "../api/flashcards.api";
import { getAvailableFlashcardSubjects } from "../lib/available-subjects";
import { resolveFlashcardSessionContext } from "../lib/session-context";
import {
  useFlashcardReviewQueue,
  useFlashcardsOverview,
} from "./useFlashcards";
import type { FlashcardReviewCard } from "../types";

export function useFlashcardsPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const initialCertificationId = searchParams.get("certificationId") ?? "";
  const initialSubjectId = searchParams.get("subjectId") ?? "";

  const [selectedCertification, setSelectedCertification] = useState(initialCertificationId);
  const [selectedSubject, setSelectedSubject] = useState(initialSubjectId);
  const [isReviewing, setIsReviewing] = useState(false);
  const [sessionCards, setSessionCards] = useState<FlashcardReviewCard[]>([]);
  const [sessionStats, setSessionStats] = useState({
    reviewedTodayBaseline: 0,
    dailyGoal: 0,
    sessionContext: null as ReturnType<typeof resolveFlashcardSessionContext>,
  });

  const filters = useMemo(
    () => ({
      ...(selectedCertification && { certificationId: selectedCertification }),
      ...(selectedSubject && { subjectId: selectedSubject }),
    }),
    [selectedCertification, selectedSubject],
  );

  const enrollments = useEnrollments();

  const certificationSubjects = useQuery({
    queryKey: queryKeys.certificationSubjects(selectedCertification),
    queryFn: () => getCertificationSubjects(selectedCertification),
    enabled: Boolean(selectedCertification),
  });

  const allFlashcards = useQuery({
    queryKey: queryKeys.flashcardsAll(),
    queryFn: () => getFlashcards(),
  });

  const overview = useFlashcardsOverview(filters);
  const reviewQueue = useFlashcardReviewQueue(filters);

  const activeEnrollments = useMemo(
    () => filterActiveEnrollments(enrollments.data ?? []),
    [enrollments.data],
  );

  const availableSubjects = useMemo(
    () =>
      getAvailableFlashcardSubjects(
        selectedCertification,
        certificationSubjects.data,
        allFlashcards.data,
      ),
    [selectedCertification, certificationSubjects.data, allFlashcards.data],
  );

  const currentSubject = useMemo(
    () => availableSubjects.find((subject) => subject.id === selectedSubject) ?? null,
    [availableSubjects, selectedSubject],
  );

  useFlashcardReviewBreadcrumbs({
    subject: currentSubject,
    certificationId: selectedCertification || undefined,
  });

  const handleCertificationChange = (certificationId: string) => {
    setSelectedCertification(certificationId);
    setSelectedSubject("");
  };

  const handleStartReview = () => {
    const queue = reviewQueue.data ?? [];

    if (queue.length === 0) {
      return;
    }

    setSessionCards(queue);
    setSessionStats({
      reviewedTodayBaseline: overview.data?.reviewedTodayCount ?? 0,
      dailyGoal: (overview.data?.reviewedTodayCount ?? 0) + queue.length,
      sessionContext: resolveFlashcardSessionContext(
        queue,
        selectedSubject || undefined,
        selectedCertification || undefined,
      ),
    });
    setIsReviewing(true);
  };

  const handleExitReview = () => {
    setIsReviewing(false);
    setSessionCards([]);
    invalidateFlashcardSessionQueries(queryClient);
  };

  const handleSessionSaved = () => {
    invalidateStudyHistoryQueries(queryClient);
  };

  const isLoading =
    enrollments.isLoading ||
    overview.isLoading ||
    reviewQueue.isLoading ||
    (selectedCertification && certificationSubjects.isLoading) ||
    allFlashcards.isLoading;

  return {
    isLoading,
    isReviewing,
    sessionCards,
    sessionStats,
    currentSubject,
    activeEnrollments,
    availableSubjects,
    overview,
    reviewQueue,
    selectedCertification,
    selectedSubject,
    handleCertificationChange,
    handleSubjectChange: setSelectedSubject,
    handleStartReview,
    handleExitReview,
    handleSessionSaved,
  };
}
