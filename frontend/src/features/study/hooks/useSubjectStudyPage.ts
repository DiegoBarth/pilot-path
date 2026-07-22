"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useSubjectStudyBreadcrumbs } from "@/lib/breadcrumbs/use-breadcrumb-trails";
import { buildStudyActivityHref } from "../lib/activity-href";
import { useSubjectStudy } from "./useSubjectStudy";

export function useSubjectStudyPage() {
  const { id: subjectId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const certificationId = searchParams.get("certificationId") ?? undefined;

  const study = useSubjectStudy({ subjectId, certificationId });

  useSubjectStudyBreadcrumbs({
    subject: study.subject,
    certificationId,
  });

  const flashcardsHref = buildStudyActivityHref({
    studyType: "FLASHCARDS",
    subjectId,
    certificationId,
  });

  return {
    subjectId,
    certificationId,
    flashcardsHref,
    ...study,
  };
}
