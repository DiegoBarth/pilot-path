import type { EnrollmentStatus } from "@/domain/enrollment";

export interface EnrollmentSummary {
  id: string;
  certificationId: string;
  status: EnrollmentStatus;
  targetExamDate?: string;
  certification: {
    id: string;
    name: string;
  };
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
  certification: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
  };
}
