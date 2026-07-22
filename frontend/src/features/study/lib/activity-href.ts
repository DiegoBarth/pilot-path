import type { StudyActivityType } from "@/domain/study-activity";
import { routes } from "@/lib/routes";

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
      return withSubjectContext(
        routes.flashcards,
        subjectId,
        certificationId,
      );

    case "MOCK_EXAM":
    case "SIMULATOR":
      return withSubjectContext(
        routes.mockExams,
        subjectId,
        certificationId,
      );

    default:
      return routes.studySubject(subjectId, certificationId);
  }
}
