"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCertificationSubjects } from "@/features/certifications/api/certifications.api";
import { getFlashcards } from "@/features/flashcards/api/flashcards.api";
import { getAvailableFlashcardSubjects } from "@/features/flashcards/lib/available-subjects";
import { filterActiveEnrollments } from "@/features/enrollments/lib/utils";
import { useEnrollments } from "@/features/enrollments/hooks/useEnrollments";
import { useMockExamBreadcrumbs } from "@/lib/breadcrumbs/use-breadcrumb-trails";
import { queryKeys } from "@/lib/query-keys";
import { getMockExamSubjectsAvailability } from "../api/mock-exams.api";
import {
  DEFAULT_MOCK_EXAM_QUESTION_COUNT,
  MIN_MOCK_EXAM_QUESTION_COUNT,
} from "../constants";
import {
  buildAvailabilityMap,
  canStartMockExam,
  enrichSubjectsWithAvailability,
  resolveQuestionCount,
} from "../lib/subject-availability";
import { useCreateMockExam } from "./useCreateMockExam";
import { useMockExams } from "./useMockExams";

export function useMockExamsPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const initialCertificationId = searchParams.get("certificationId") ?? "";
  const initialSubjectId = searchParams.get("subjectId") ?? "";

  const [selectedCertification, setSelectedCertification] =
    useState(initialCertificationId);
  const [selectedSubject, setSelectedSubject] = useState(initialSubjectId);
  const [questionCount, setQuestionCount] = useState(
    DEFAULT_MOCK_EXAM_QUESTION_COUNT,
  );

  const enrollments = useEnrollments();
  const mockExams = useMockExams();
  const createMockExam = useCreateMockExam();

  const subjectsAvailability = useQuery({
    queryKey: queryKeys.mockExamSubjectsAvailability(),
    queryFn: getMockExamSubjectsAvailability,
  });

  const certificationSubjects = useQuery({
    queryKey: queryKeys.certificationSubjects(selectedCertification),
    queryFn: () => getCertificationSubjects(selectedCertification),
    enabled: Boolean(selectedCertification),
  });

  const allFlashcards = useQuery({
    queryKey: queryKeys.flashcardsAll(),
    queryFn: () => getFlashcards(),
  });

  const activeEnrollments = useMemo(
    () => filterActiveEnrollments(enrollments.data ?? []),
    [enrollments.data],
  );

  useEffect(() => {
    for (const enrollment of activeEnrollments) {
      void queryClient.prefetchQuery({
        queryKey: queryKeys.certificationSubjects(enrollment.certificationId),
        queryFn: () => getCertificationSubjects(enrollment.certificationId),
      });
    }
  }, [activeEnrollments, queryClient]);

  const availabilityMap = useMemo(
    () => buildAvailabilityMap(subjectsAvailability.data ?? []),
    [subjectsAvailability.data],
  );

  const availableSubjects = useMemo(
    () =>
      enrichSubjectsWithAvailability(
        getAvailableFlashcardSubjects(
          selectedCertification,
          certificationSubjects.data,
          allFlashcards.data,
        ),
        availabilityMap,
      ),
    [
      selectedCertification,
      certificationSubjects.data,
      allFlashcards.data,
      availabilityMap,
    ],
  );

  const selectedSubjectAvailability =
    availabilityMap.get(selectedSubject) ?? 0;

  const effectiveQuestionCount = useMemo(() => {
    if (!selectedSubject) {
      return questionCount;
    }

    return resolveQuestionCount(
      selectedSubjectAvailability,
      questionCount,
    );
  }, [selectedSubject, selectedSubjectAvailability, questionCount]);

  useEffect(() => {
    if (!selectedSubject) {
      return;
    }

    const available = availabilityMap.get(selectedSubject) ?? 0;

    if (available < MIN_MOCK_EXAM_QUESTION_COUNT) {
      setSelectedSubject("");
      return;
    }

    setQuestionCount((current) => resolveQuestionCount(available, current));
  }, [selectedSubject, availabilityMap]);

  const currentSubject = useMemo(
    () =>
      availableSubjects.find((subject) => subject.id === selectedSubject) ??
      null,
    [availableSubjects, selectedSubject],
  );

  useMockExamBreadcrumbs({
    subject: currentSubject,
    certificationId: selectedCertification || undefined,
  });

  const handleCertificationChange = (certificationId: string) => {
    setSelectedCertification(certificationId);
    setSelectedSubject("");
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);

    if (!subjectId) {
      return;
    }

    const available = availabilityMap.get(subjectId) ?? 0;
    setQuestionCount((current) => resolveQuestionCount(available, current));
  };

  const canStart = canStartMockExam(
    selectedSubjectAvailability,
    effectiveQuestionCount,
  );

  const handleStartExam = () => {
    if (!selectedSubject || !canStart) {
      return;
    }

    createMockExam.mutate({
      subjectId: selectedSubject,
      questionCount: effectiveQuestionCount,
    });
  };

  const isLoading =
    enrollments.isLoading ||
    mockExams.isLoading ||
    allFlashcards.isLoading ||
    subjectsAvailability.isLoading;

  return {
    isLoading,
    activeEnrollments,
    availableSubjects,
    mockExams: mockExams.data ?? [],
    selectedCertification,
    selectedSubject,
    questionCount: effectiveQuestionCount,
    currentSubject,
    canStart,
    isCreating: createMockExam.isPending,
    createError: createMockExam.error,
    handleCertificationChange,
    handleSubjectChange,
    handleQuestionCountChange: setQuestionCount,
    handleStartExam,
  };
}
