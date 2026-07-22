import type { FlashcardFilters } from "@/features/flashcards/api/flashcards.api";

export const queryKeys = {
  enrollments: () => ["enrollments"] as const,
  certificationSubjects: (certificationId: string) =>
    ["certification-subjects", certificationId] as const,
  flashcardsAll: () => ["flashcards-all"] as const,
  flashcardsOverview: (filters: FlashcardFilters = {}) =>
    ["flashcards-overview", filters] as const,
  flashcardsReviewQueue: (filters: FlashcardFilters = {}) =>
    ["flashcards-review-queue", filters] as const,
  learningStatistics: () => ["learning-statistics"] as const,
  subjectAnalytics: () => ["subject-analytics"] as const,
  recentStudyHistory: (limit = 5) => ["recent-study-history", limit] as const,
  certificationStudySessions: (certificationId: string) =>
    ["certification-study-sessions", certificationId] as const,
} as const;

export function invalidateFlashcardSessionQueries(
  queryClient: { invalidateQueries: (options: { queryKey: readonly unknown[] }) => void },
) {
  queryClient.invalidateQueries({ queryKey: ["flashcards-review-queue"] });
  queryClient.invalidateQueries({ queryKey: ["flashcards-overview"] });
  queryClient.invalidateQueries({ queryKey: queryKeys.learningStatistics() });
  queryClient.invalidateQueries({ queryKey: queryKeys.subjectAnalytics() });
  queryClient.invalidateQueries({ queryKey: ["recent-study-history"] });
  queryClient.invalidateQueries({ queryKey: ["certification-study-sessions"] });
}

export function invalidateStudyHistoryQueries(
  queryClient: { invalidateQueries: (options: { queryKey: readonly unknown[] }) => void },
) {
  queryClient.invalidateQueries({ queryKey: ["recent-study-history"] });
  queryClient.invalidateQueries({ queryKey: ["certification-study-sessions"] });
}
