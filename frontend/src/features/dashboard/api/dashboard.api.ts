import { apiClient } from "@/lib/api/client";
import type {
  LearningStatistics,
  FlashcardPerformance,
  QuestionPerformance,
  MockExamPerformance,
  SubjectAnalyticsResponse,
} from "../types";

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