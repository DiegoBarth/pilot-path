import { ACTIVE_ENROLLMENT_STATUSES } from "../constants";
import type { EnrollmentStatus } from "@/domain/enrollment";
import type { EnrollmentSummary } from "@/features/dashboard/types";

export function isActiveEnrollment(
  status?: EnrollmentStatus | EnrollmentSummary["status"],
) {
  return status ? ACTIVE_ENROLLMENT_STATUSES.includes(status) : false;
}

export function filterActiveEnrollments(enrollments: EnrollmentSummary[]) {
  return enrollments.filter((enrollment) => isActiveEnrollment(enrollment.status));
}
