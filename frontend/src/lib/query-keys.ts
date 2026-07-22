import type { FlashcardQueryFilters } from "@/lib/flashcard-filters";

type QueryClientLike = {
  invalidateQueries: (options: { queryKey: readonly unknown[] }) => void;
};

export const queryKeys = {
  enrollments: () => ["enrollments"] as const,
  certifications: () => ["certifications"] as const,
  certification: (id: string) => ["certification", id] as const,
  certificationSubjects: (certificationId: string) =>
    ["certification-subjects", certificationId] as const,
  subjects: () => ["subjects"] as const,
  subjectStudyHistory: (subjectId: string, certificationId?: string) =>
    ["study-history", subjectId, certificationId] as const,
  flashcardsAll: () => ["flashcards-all"] as const,
  flashcardsOverview: (filters: FlashcardQueryFilters = {}) =>
    ["flashcards-overview", filters] as const,
  flashcardsReviewQueue: (filters: FlashcardQueryFilters = {}) =>
    ["flashcards-review-queue", filters] as const,
  learningStatistics: () => ["learning-statistics"] as const,
  subjectAnalytics: () => ["subject-analytics"] as const,
  recentStudyHistory: (limit = 5) => ["recent-study-history", limit] as const,
  certificationStudySessions: (certificationId: string) =>
    ["certification-study-sessions", certificationId] as const,
} as const;

export function invalidateEnrollments(queryClient: QueryClientLike) {
  queryClient.invalidateQueries({ queryKey: queryKeys.enrollments() });
}

export function invalidateCertifications(queryClient: QueryClientLike) {
  queryClient.invalidateQueries({ queryKey: queryKeys.certifications() });
}

export function invalidateCertificationDetails(
  queryClient: QueryClientLike,
  certificationId: string,
) {
  queryClient.invalidateQueries({
    queryKey: queryKeys.certification(certificationId),
  });
  queryClient.invalidateQueries({
    queryKey: queryKeys.certificationSubjects(certificationId),
  });
  queryClient.invalidateQueries({
    queryKey: queryKeys.certificationStudySessions(certificationId),
  });
}

export function invalidateEnrollmentMutations(
  queryClient: QueryClientLike,
  certificationId?: string,
) {
  invalidateEnrollments(queryClient);
  invalidateCertifications(queryClient);

  if (certificationId) {
    invalidateCertificationDetails(queryClient, certificationId);
  }
}

export function invalidateSubjectStudyHistory(
  queryClient: QueryClientLike,
  subjectId?: string,
  certificationId?: string,
) {
  if (subjectId) {
    queryClient.invalidateQueries({
      queryKey: queryKeys.subjectStudyHistory(subjectId, certificationId),
    });
    return;
  }

  queryClient.invalidateQueries({ queryKey: ["study-history"] });
}

export function invalidateFlashcardSessionQueries(queryClient: QueryClientLike) {
  queryClient.invalidateQueries({ queryKey: ["flashcards-review-queue"] });
  queryClient.invalidateQueries({ queryKey: ["flashcards-overview"] });
  queryClient.invalidateQueries({ queryKey: queryKeys.learningStatistics() });
  queryClient.invalidateQueries({ queryKey: queryKeys.subjectAnalytics() });
  invalidateStudyHistoryQueries(queryClient);
}

export function invalidateStudyHistoryQueries(queryClient: QueryClientLike) {
  queryClient.invalidateQueries({ queryKey: ["recent-study-history"] });
  queryClient.invalidateQueries({ queryKey: ["certification-study-sessions"] });
  queryClient.invalidateQueries({ queryKey: ["study-history"] });
}

export function invalidateStudySessionMutations(
  queryClient: QueryClientLike,
  params?: { subjectId?: string; certificationId?: string },
) {
  invalidateStudyHistoryQueries(queryClient);
  invalidateSubjectStudyHistory(
    queryClient,
    params?.subjectId,
    params?.certificationId,
  );
  queryClient.invalidateQueries({ queryKey: queryKeys.learningStatistics() });
  queryClient.invalidateQueries({ queryKey: queryKeys.subjectAnalytics() });
}
