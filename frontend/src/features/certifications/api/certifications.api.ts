import { apiClient } from "@/lib/api/client";
import type { PaginatedResult } from "@/domain/pagination";
import type {
  Certification,
  CertificationSubject,
  Enrollment,
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

export function enrollInCertification(certificationId: string) {
  return apiClient<Enrollment>(
    `/certifications/${certificationId}/enroll`,
    {
      method: "POST",
    },
  );
}
export function cancelCertificationEnrollment(enrollmentId: string) {
  return apiClient<Enrollment>(
    `/enrollments/${enrollmentId}/cancel`,
    {
      method: "PATCH",
    },
  );
}

export function getCertificationStudySessions(certificationId: string) {
  return apiClient<PaginatedResult<StudySession>>(
    `/study-history?certificationId=${certificationId}&limit=100`,
  );
}
