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
