import { cn } from "@/lib/utils";
import {
  ENROLLMENT_STATUS_CARD_STYLES,
  ENROLLMENT_STATUS_STYLES,
  getEnrollmentStatusLabel,
} from "@/features/enrollments/constants";
import type { EnrollmentDisplayStatus } from "@/domain/enrollment";

interface EnrollmentStatusBadgeProps {
  status: EnrollmentDisplayStatus;
  variant?: "card" | "compact";
  className?: string;
}

export function EnrollmentStatusBadge({
  status,
  variant = "card",
  className,
}: EnrollmentStatusBadgeProps) {
  const isCompact = variant === "compact";

  return (
    <span
      className={cn(
        "inline-flex rounded-full font-medium",
        isCompact
          ? cn(
              "px-2 py-0.5 text-[10px] uppercase tracking-wide",
              ENROLLMENT_STATUS_STYLES[status],
            )
          : cn(
              "border px-3 py-1 text-xs",
              ENROLLMENT_STATUS_CARD_STYLES[status],
            ),
        className,
      )}
    >
      {getEnrollmentStatusLabel(status)}
    </span>
  );
}
