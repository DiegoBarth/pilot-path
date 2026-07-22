import { apiClient } from "@/lib/api/client";
import { getEnrollments } from "@/features/enrollments/api/enrollments.api";
import type { PaginatedResult } from "@/domain/pagination";
import type {
  LearningStatistics,
  FlashcardPerformance,
  QuestionPerformance,
  MockExamPerformance,
  SubjectAnalyticsResponse,
  RecentStudySession,
} from "../types";

export { getEnrollments };

export function getLearningStatistics() {
  return apiClient<LearningStatistics>(
    "/learning/statistics",
  );
}

export function getFlashcardStatistics() {
  return apiClient<FlashcardPerformance>(
    "/learning/statistics/flashcards",
  );
}

export function getQuestionStatistics() {
  return apiClient<QuestionPerformance>(
    "/learning/statistics/questions",
  );
}

export function getMockExamStatistics() {
  return apiClient<MockExamPerformance>(
    "/learning/statistics/mock-exams",
  );
}

export function getSubjectAnalytics() {
  return apiClient<SubjectAnalyticsResponse>(
    "/learning/statistics/subjects",
  );
}

export function getRecentStudyHistory(limit = 5) {
  return apiClient<PaginatedResult<RecentStudySession>>(
    `/study-history?limit=${limit}`,
  );
}