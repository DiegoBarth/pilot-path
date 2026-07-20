import { apiClient } from "@/lib/api/client";
import type {
  Certification,
  CertificationSubject,
  Enrollment,
  PaginatedResult,
  StudySession,
} from "../types";

export function getCertifications() {
  return apiClient<Certification[]>(
    "/certifications",
  );
}

export function getCertification(id: string) {
  return apiClient<Certification>(
    `/certifications/${id}`,
  );
}

export function getCertificationSubjects(id: string) {
  return apiClient<CertificationSubject[]>(
    `/certifications/${id}/subjects`,
  );
}

export function getEnrollments() {
  return apiClient<Enrollment[]>(
    "/enrollments",
  );
}

export function enrollInCertification(certificationId: string) {
  return apiClient<Enrollment>(
    `/certifications/${certificationId}/enroll`,
    {
      method: "POST",
    },
  );
}

export function getCertificationStudySessions(certificationId: string) {
  return apiClient<PaginatedResult<StudySession>>(
    `/study-history?certificationId=${certificationId}&limit=100`,
  );
}
