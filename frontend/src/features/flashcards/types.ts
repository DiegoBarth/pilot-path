export interface FlashcardItem {
  id: string;
  subjectId: string;
  subjectName?: string;
  question: string;
  answer: string;
}

export interface ReviewSessionStats {
  total: number;
  correct: number;
  wrong: number;
}

export interface FlashcardSubject {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Flashcard {
  id: string;
  subjectId: string;
  question: string;
  answer: string;
  isActive: boolean;
  subject: FlashcardSubject;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface UserFlashcard {
  id: string;
  userId: string;
  flashcardId: string;
  correctCount: number;
  wrongCount: number;
  lastReviewedAt?: string | null;
  nextReviewAt?: string | null;
}

export interface FlashcardReviewCard extends Flashcard {
  userFlashcard?: UserFlashcard | null;
}

export interface FlashcardOverview {
  dueTodayCount: number;
  reviewedTodayCount: number;
  accuracyRate: number;
  availableCount: number;
  totalCount: number;
}

export interface FlashcardReview {
  id: string;
  userFlashcardId: string;
  isCorrect: boolean;
  reviewedAt: string;
}

export interface CreateFlashcardReviewPayload {
  correct: boolean;
}
