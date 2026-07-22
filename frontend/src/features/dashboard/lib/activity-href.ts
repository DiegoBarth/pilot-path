import type { StudyActivityType } from "../types";

interface BuildStudyActivityHrefParams {
  studyType: StudyActivityType | string;
  subjectId: string;
  certificationId: string;
}

function withSubjectContext(path: string, subjectId: string, certificationId: string) {
  const params = new URLSearchParams({
    subjectId,
    certificationId,
  });

  return `${path}?${params.toString()}`;
}

export function buildStudyActivityHref({
  studyType,
  subjectId,
  certificationId,
}: BuildStudyActivityHrefParams) {
  switch (studyType) {
    case "FLASHCARDS":
      return withSubjectContext("/flashcards", subjectId, certificationId);

    case "MOCK_EXAM":
      return withSubjectContext("/mock-exams", subjectId, certificationId);

    case "SIMULATOR":
      return withSubjectContext("/mock-exams", subjectId, certificationId);

    default:
      return `/study/subject/${subjectId}?certificationId=${certificationId}`;
  }
}
