import type { StudyActivityType } from "@/domain/study-activity";

interface BuildStudyActivityHrefParams {
  studyType: StudyActivityType | string;
  subjectId: string;
  certificationId?: string;
}

function withSubjectContext(
  path: string,
  subjectId: string,
  certificationId?: string,
) {
  const params = new URLSearchParams({ subjectId });

  if (certificationId) {
    params.set("certificationId", certificationId);
  }

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
    case "SIMULATOR":
      return withSubjectContext("/mock-exams", subjectId, certificationId);

    default:
      return certificationId
        ? `/study/subject/${subjectId}?certificationId=${certificationId}`
        : `/study/subject/${subjectId}`;
  }
}
