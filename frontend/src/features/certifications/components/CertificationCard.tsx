import Link from "next/link";
import { EnrollmentStatusBadge } from "@/features/enrollments/components/EnrollmentStatusBadge";
import type { EnrollmentDisplayStatus } from "@/domain/enrollment";

interface CertificationCardProps {
  certification: {
    id: string;
    name: string;
    description: string;
    progress?: number;
    status: EnrollmentDisplayStatus;
  };
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Link
      href={`/certifications/${certification.id}`}
      className="rounded-2xl border border-white/5 bg-card p-6 transition hover:border-amber-500/40"
    >
      <h2 className="text-xl font-semibold text-slate-50">
        {certification.name}
      </h2>

      <p className="mt-2 text-sm text-slate-400">{certification.description}</p>

      {typeof certification.progress === "number" && (
        <div className="mt-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Progresso</span>
            <span className="text-amber-400">{certification.progress}%</span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${certification.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-5">
        <EnrollmentStatusBadge status={certification.status} />
      </div>
    </Link>
  );
}
