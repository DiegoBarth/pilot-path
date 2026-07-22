"use client";

import { useMutation } from "@tanstack/react-query";
import { submitFlashcardReview } from "../api/flashcards.api";
import type { CreateFlashcardReviewPayload } from "../types";

export function useSubmitFlashcardReview() {
  return useMutation({
    mutationFn: ({
      flashcardId,
      payload,
    }: {
      flashcardId: string;
      payload: CreateFlashcardReviewPayload;
    }) => submitFlashcardReview(flashcardId, payload),
  });
}
