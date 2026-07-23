export type QuestionDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface QuestionAlternative {
  id: string;
  letter: string;
  content: string;
}

export interface MockExamQuestionContent {
  id: string;
  statement: string;
  explanation?: string | null;
  difficulty: QuestionDifficulty;
  alternatives: QuestionAlternative[];
}

export interface MockExamQuestionItem {
  id: string;
  questionId: string;
  displayOrder: number;
  isCorrect?: boolean | null;
  selectedAlternativeId?: string | null;
  question: MockExamQuestionContent;
  selectedAlternative?: QuestionAlternative | null;
}

export interface SubjectSummary {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface MockExamSummary {
  id: string;
  subjectId?: string | null;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passingScore: number;
  passed: boolean;
  duration?: number | null;
  startedAt: string;
  finishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  subject?: SubjectSummary;
}

export interface MockExam extends MockExamSummary {
  questions: MockExamQuestionItem[];
}

export interface CreateMockExamRequest {
  subjectId: string;
  questionCount?: number;
}

export interface FinishMockExamAnswer {
  questionId: string;
  alternativeId: string;
}

export interface FinishMockExamRequest {
  answers: FinishMockExamAnswer[];
  duration: number;
}

export interface SubjectQuestionAvailability {
  subjectId: string;
  questionCount: number;
}
