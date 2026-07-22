import type { EnrollmentStatus } from "@/features/dashboard/types";

export const ACTIVE_ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  "ACTIVE",
  "COMPLETED",
];

export const ENROLLMENT_STATUS_LABELS: Record<EnrollmentStatus, string> = {
  ACTIVE: "Em andamento",
  COMPLETED: "Concluído",
  PAUSED: "Pausado",
  DROPPED: "Abandonado",
};

export const ENROLLMENT_STATUS_STYLES: Record<EnrollmentStatus, string> = {
  ACTIVE: "bg-teal-500/10 text-teal-400",
  COMPLETED: "bg-amber-500/10 text-amber-400",
  PAUSED: "bg-slate-500/10 text-slate-400",
  DROPPED: "bg-red-500/10 text-red-400",
};
