import { apiClient } from "@/lib/api/client";
import type { EnrollmentSummary } from "@/features/enrollments/types";

export function getEnrollments() {
  return apiClient<EnrollmentSummary[]>("/enrollments");
}
