import type { FlashcardReviewCard } from "../types";

export interface FlashcardSessionContext {
  subjectId: string;
  certificationId?: string;
}

export function resolveFlashcardSessionContext(
  cards: FlashcardReviewCard[],
  selectedSubjectId?: string,
  selectedCertificationId?: string,
): FlashcardSessionContext | null {
  const subjectId = selectedSubjectId || cards[0]?.subjectId;

  if (!subjectId) {
    return null;
  }

  return {
    subjectId,
    ...(selectedCertificationId && {
      certificationId: selectedCertificationId,
    }),
  };
}
