import { apiClient } from "@/lib/api/client";

import type { Subject, StudyHistoryResponse, StudySession } from "../types";

export function getSubjects() {
  return apiClient<Subject[]>(
    "/subjects"
  );
}

export function getSubjectStudyHistory(subjectId: string, certificationId?: string) {
  const params = new URLSearchParams({
    subjectId,
    limit: "100"
  });

  if (certificationId) {
    params.set("certificationId", certificationId);
  }

  return apiClient<StudyHistoryResponse>(
    `/study-history?${params.toString()}`
  );
}

export function getStudySessions() {
  return apiClient<StudySession[]>(
    "/study-sessions"
  );
}