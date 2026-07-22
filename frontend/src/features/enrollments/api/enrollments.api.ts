import { apiClient } from "@/lib/api/client";
import type { EnrollmentSummary } from "@/features/dashboard/types";

export function getEnrollments() {
  return apiClient<EnrollmentSummary[]>("/enrollments");
}
