"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getFlashcardReviewQueue,
  getFlashcardsOverview,
  type FlashcardFilters,
} from "../api/flashcards.api";

export function useFlashcardsOverview(filters: FlashcardFilters = {}) {
  return useQuery({
    queryKey: queryKeys.flashcardsOverview(filters),
    queryFn: () => getFlashcardsOverview(filters),
  });
}

export function useFlashcardReviewQueue(
  filters: FlashcardFilters = {},
  enabled = true,
) {
  return useQuery({
    queryKey: queryKeys.flashcardsReviewQueue(filters),
    queryFn: () => getFlashcardReviewQueue(filters),
    enabled,
  });
}
