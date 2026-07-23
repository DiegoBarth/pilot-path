import type { PaginatedResult } from "@/domain/pagination";
import type { EnrollmentSummary } from "@/features/enrollments/types";

export type { Enrollment } from "@/features/enrollments/types";

export interface Certification {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  enrollments: EnrollmentSummary[];
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface CertificationSubject {
  id: string;
  certificationId: string;
  subjectId: string;
  displayOrder: number;
  isRequired: boolean;
  subject: Subject;
}

export interface StudySession {
  id: string;
  startedAt: string;
  endedAt?: string;
  studyType: string;
  notes?: string;
  createdAt: string;
  certification: Certification;
  subject: Subject;
}

export type { PaginatedResult };
