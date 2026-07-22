"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getFlashcardReviewQueue,
  getFlashcardsOverview,
  type FlashcardFilters,
} from "../api/flashcards.api";

export function useFlashcardsOverview(filters: FlashcardFilters = {}) {
  return useQuery({
    queryKey: ["flashcards-overview", filters],
    queryFn: () => getFlashcardsOverview(filters),
  });
}

export function useFlashcardReviewQueue(
  filters: FlashcardFilters = {},
  enabled = true,
) {
  return useQuery({
    queryKey: ["flashcards-review-queue", filters],
    queryFn: () => getFlashcardReviewQueue(filters),
    enabled,
  });
}
