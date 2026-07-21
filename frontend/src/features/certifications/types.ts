export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "PAUSED" | "DROPPED";

export interface Certification {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  enrollments: Enrollment[];
}

export interface Enrollment {
  id: string;
  userId: string;
  certificationId: string;
  status: EnrollmentStatus;
  targetExamDate?: string;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  certification: Certification;
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
  order: number;
  required: boolean;
  subject: Subject;
}

export interface StudySession {
  id: string;
  startedAt: string;
  endedAt?: string;
  studyType: string;
  mood?: string;
  notes?: string;
  createdAt: string;
  certification: Certification;
  subject: Subject;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}
