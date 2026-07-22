import { ACTIVE_ENROLLMENT_STATUSES } from "../constants";
import type { EnrollmentSummary } from "@/features/dashboard/types";

export function isActiveEnrollment(status: EnrollmentSummary["status"]) {
  return ACTIVE_ENROLLMENT_STATUSES.includes(status);
}

export function filterActiveEnrollments(enrollments: EnrollmentSummary[]) {
  return enrollments.filter((enrollment) => isActiveEnrollment(enrollment.status));
}
