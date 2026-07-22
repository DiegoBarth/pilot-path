/** Mirrors Prisma `EnrollmentStatus` enum. */
export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "PAUSED" | "DROPPED";

export const ENROLLMENT_STATUSES = [
  "ACTIVE",
  "COMPLETED",
  "PAUSED",
  "DROPPED",
] as const satisfies readonly EnrollmentStatus[];

export const ENROLLMENT_NOT_STARTED = "NOT_STARTED" as const;

export type EnrollmentDisplayStatus =
  | EnrollmentStatus
  | typeof ENROLLMENT_NOT_STARTED;
