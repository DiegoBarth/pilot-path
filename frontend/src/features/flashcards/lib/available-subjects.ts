import type { Flashcard } from "../types";

interface SubjectOption {
  id: string;
  name: string;
}

export function getAvailableFlashcardSubjects(
  selectedCertification: string,
  certificationSubjects: { subject: SubjectOption }[] | undefined,
  allFlashcards: Flashcard[] | undefined,
): SubjectOption[] {
  if (selectedCertification) {
    return (certificationSubjects ?? []).map((item) => item.subject);
  }

  const subjectsMap = new Map<string, SubjectOption>();

  for (const card of allFlashcards ?? []) {
    subjectsMap.set(card.subject.id, {
      id: card.subject.id,
      name: card.subject.name,
    });
  }

  return Array.from(subjectsMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR"),
  );
}
