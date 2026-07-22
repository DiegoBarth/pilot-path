export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "PAUSED" | "DROPPED";

export const ENROLLMENT_NOT_STARTED = "NOT_STARTED" as const;

export type EnrollmentDisplayStatus =
  | EnrollmentStatus
  | typeof ENROLLMENT_NOT_STARTED;
