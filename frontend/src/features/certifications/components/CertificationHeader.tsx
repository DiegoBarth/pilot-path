import { Button } from "@/components/ui/button";
import { EnrollmentStatusBadge } from "@/features/enrollments/components/EnrollmentStatusBadge";
import { ENROLLMENT_NOT_STARTED } from "@/domain/enrollment";
import type { EnrollmentDisplayStatus } from "@/domain/enrollment";

interface CertificationHeaderProps {
  certification: {
    id: string;
    name: string;
    description?: string;
  };
  progress: number;
  status: EnrollmentDisplayStatus;
  onEnroll?: () => void;
  onCancel?: () => void;
  isUpdating?: boolean;
}

export function CertificationHeader({
  certification,
  status,
  onEnroll,
  onCancel,
  isUpdating,
}: CertificationHeaderProps) {
  const isNotStarted =
    status === ENROLLMENT_NOT_STARTED || status === "DROPPED";
  const isInProgress = status === "ACTIVE";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {certification.name}
        </h1>

        <EnrollmentStatusBadge status={status} />
      </div>

      {isNotStarted && (
        <Button
          onClick={onEnroll}
          disabled={isUpdating}
          className="rounded-lg px-5 py-3"
        >
          {isUpdating ? "Iniciando..." : "Iniciar certificação"}
        </Button>
      )}

      {isInProgress && (
        <Button
          onClick={onCancel}
          disabled={isUpdating}
          className="rounded-lg px-5 py-3"
        >
          {isUpdating ? "Cancelando..." : "Cancelar certificação"}
        </Button>
      )}
    </div>
  );
}
