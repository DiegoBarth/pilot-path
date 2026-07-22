import { apiClient } from "@/lib/api/client";
import type {
  CreateFlashcardReviewPayload,
  Flashcard,
  FlashcardOverview,
  FlashcardReview,
  FlashcardReviewCard,
} from "../types";

export interface FlashcardFilters {
  subjectId?: string;
  certificationId?: string;
}

function buildFlashcardQuery(filters: FlashcardFilters = {}) {
  const params = new URLSearchParams();

  if (filters.subjectId) {
    params.set("subjectId", filters.subjectId);
  }

  if (filters.certificationId) {
    params.set("certificationId", filters.certificationId);
  }

  const query = params.toString();

  return query ? `?${query}` : "";
}

export function getFlashcardsOverview(filters: FlashcardFilters = {}) {
  return apiClient<FlashcardOverview>(
    `/flashcards/overview${buildFlashcardQuery(filters)}`,
  );
}

export function getFlashcardReviewQueue(filters: FlashcardFilters = {}) {
  return apiClient<FlashcardReviewCard[]>(
    `/flashcards/review-queue${buildFlashcardQuery(filters)}`,
  );
}

export function getFlashcards(filters: FlashcardFilters = {}) {
  return apiClient<FlashcardReviewCard[]>(
    `/flashcards${buildFlashcardQuery(filters)}`,
  );
}

export function getFlashcard(id: string) {
  return apiClient<FlashcardReviewCard>(`/flashcards/${id}`);
}

export function submitFlashcardReview(
  flashcardId: string,
  payload: CreateFlashcardReviewPayload,
) {
  return apiClient<FlashcardReview>(`/flashcards/${flashcardId}/review`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
