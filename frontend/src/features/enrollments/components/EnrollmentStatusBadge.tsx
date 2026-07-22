import { cn } from "@/lib/utils";
import {
  ENROLLMENT_STATUS_CARD_STYLES,
  getEnrollmentStatusLabel,
} from "@/features/enrollments/constants";
import type { EnrollmentDisplayStatus } from "@/domain/enrollment";

interface EnrollmentStatusBadgeProps {
  status: EnrollmentDisplayStatus;
  className?: string;
}

export function EnrollmentStatusBadge({
  status,
  className,
}: EnrollmentStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
        ENROLLMENT_STATUS_CARD_STYLES[status],
        className,
      )}
    >
      {getEnrollmentStatusLabel(status)}
    </span>
  );
}
