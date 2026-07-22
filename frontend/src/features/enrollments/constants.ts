import type {
  EnrollmentDisplayStatus,
  EnrollmentStatus,
} from "@/domain/enrollment";
import { ENROLLMENT_NOT_STARTED } from "@/domain/enrollment";

export const ACTIVE_ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  "ACTIVE",
  "COMPLETED",
];

export const ENROLLMENT_STATUS_LABELS: Record<EnrollmentDisplayStatus, string> = {
  ACTIVE: "Em andamento",
  COMPLETED: "Concluído",
  PAUSED: "Pausado",
  DROPPED: "Abandonado",
  [ENROLLMENT_NOT_STARTED]: "Não iniciado",
};

export const ENROLLMENT_STATUS_STYLES: Record<EnrollmentDisplayStatus, string> = {
  ACTIVE: "bg-teal-500/10 text-teal-400",
  COMPLETED: "bg-amber-500/10 text-amber-400",
  PAUSED: "bg-slate-500/10 text-slate-400",
  DROPPED: "bg-red-500/10 text-red-400",
  [ENROLLMENT_NOT_STARTED]: "bg-slate-500/10 text-slate-400",
};

export const ENROLLMENT_STATUS_CARD_STYLES: Record<EnrollmentDisplayStatus, string> = {
  ACTIVE: "border-amber-500/40 bg-primary/10 text-amber-400",
  COMPLETED: "border-teal-500/40 bg-teal-500/10 text-teal-400",
  PAUSED: "border-sky-500/40 bg-sky-500/10 text-sky-400",
  DROPPED: "border-red-500/40 bg-red-500/10 text-red-400",
  [ENROLLMENT_NOT_STARTED]: "border-slate-500/40 bg-slate-500/10 text-slate-400",
};

export function getEnrollmentDisplayStatus(
  enrollment?: { status: EnrollmentStatus } | null,
): EnrollmentDisplayStatus {
  return enrollment?.status ?? ENROLLMENT_NOT_STARTED;
}

export function getEnrollmentStatusLabel(status: EnrollmentDisplayStatus) {
  return ENROLLMENT_STATUS_LABELS[status];
}
