import { apiClient } from "@/lib/api/client";
import type { StudyType } from "@/domain/study-type";
import type {
  StudyHistoryResponse,
  StudySession,
  Subject,
} from "../types";

export interface CreateStudySessionBySubjectPayload {
  subjectId: string;
  certificationId?: string;
  startedAt: string;
  endedAt: string;
  studyType: StudyType;
  notes?: string;
}

export function getSubjects() {
  return apiClient<Subject[]>("/subjects");
}

export function getSubjectStudyHistory(subjectId: string, certificationId?: string) {
  const params = new URLSearchParams({
    subjectId,
    limit: "100",
  });

  if (certificationId) {
    params.set("certificationId", certificationId);
  }

  return apiClient<StudyHistoryResponse>(`/study-history?${params.toString()}`);
}

export function createStudySessionBySubject(
  payload: CreateStudySessionBySubjectPayload,
) {
  return apiClient<StudySession>("/study-sessions/by-subject", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
