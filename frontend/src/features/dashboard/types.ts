import type { EnrollmentStatus } from "@/domain/enrollment";

export type { EnrollmentStatus };
export type { PaginatedResult, PaginationMeta } from "@/domain/pagination";
export type { StudyActivityType } from "@/domain/study-activity";

export type QuestionDifficulty =
  | "EASY"
  | "MEDIUM"
  | "HARD";

export interface DifficultyPerformance {
  difficulty: QuestionDifficulty;
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
}

export interface FlashcardReviewHistory {
  period: string;
  reviews: number;
}

export interface FlashcardPerformance {
  totalReviews: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  reviewHistory: FlashcardReviewHistory[];
}

export interface MockExamScoreHistory {
  period: string;
  averageScore: number;
}

export interface MockExamPerformance {
  completedExams: number;
  averageScore: number;
  approvalRate: number;
  bestResult: number;
  worstResult: number;
  scoreHistory: MockExamScoreHistory[];
}

export interface PerformanceTrend {
  period: string;
  accuracy: number;
}

export interface SubjectPerformance {
  subjectId: string;
  subjectName: string;
  accuracy: number;
  totalAnswers: number;
}

export interface WeakSubject {
  subjectId: string;
  subjectName: string;
  accuracy: number;
}

export interface LearningStatistics {
  flashcardAccuracy: number;
  questionAccuracy: number;
  mockExamPerformance: number;
  subjectPerformance: SubjectPerformance[];
  weakSubjects: WeakSubject[];
  performanceTrends: PerformanceTrend[];
}

export interface QuestionPerformance {
  totalAnswers: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  performanceByDifficulty: DifficultyPerformance[];
}

export interface SubjectAnalytics {
  subjectId: string;
  subjectName: string;
  questionAccuracy: number;
  questionsAnswered: number;
  flashcardAccuracy: number;
  flashcardsReviewed: number;
  overallAccuracy: number;
}

export interface SubjectAnalyticsResponse {
  subjects: SubjectAnalytics[];
  weakSubjects: WeakSubject[];
}

export type { EnrollmentSummary } from "@/features/enrollments/types";

export interface RecentStudySession {
  id: string;
  startedAt: string;
  studyType: import("@/domain/study-activity").StudyActivityType;
  certification: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
  };
}
