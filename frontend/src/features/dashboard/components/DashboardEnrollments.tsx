import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { EnrollmentSummary } from "../types";

const ENROLLMENT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Em andamento",
  COMPLETED: "Concluído",
  PAUSED: "Pausado",
  DROPPED: "Abandonado",
};

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-teal-500/10 text-teal-400",
  COMPLETED: "bg-amber-500/10 text-amber-400",
  PAUSED: "bg-slate-500/10 text-slate-400",
  DROPPED: "bg-red-500/10 text-red-400",
};

interface DashboardEnrollmentsProps {
  enrollments: EnrollmentSummary[];
}

export function DashboardEnrollments({ enrollments }: DashboardEnrollmentsProps) {
  const activeEnrollments = enrollments.filter((e) =>
    ["ACTIVE", "COMPLETED"].includes(e.status),
  );

  return (
    <div className="flex flex-col rounded-2xl border border-white/5 bg-[#1E2834]">
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <h2 className="text-base font-semibold text-white">Minhas certificações</h2>

        <Link
          href="/certifications"
          className="text-xs font-medium text-slate-400 transition hover:text-amber-400"
        >
          Ver todas
        </Link>
      </div>

      <div className="flex flex-col gap-1 p-3">
        {activeEnrollments.length === 0 ? (
          <p className="px-3 py-4 text-sm text-slate-500">
            Você ainda não está inscrito em nenhuma certificação.
          </p>
        ) : (
          activeEnrollments.slice(0, 4).map((enrollment) => (
            <Link
              key={enrollment.id}
              href={`/certifications/${enrollment.certificationId}`}
              className="group flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.03]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-200 group-hover:text-white">
                  {enrollment.certification.name}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_STYLES[enrollment.status] ?? STATUS_STYLES.PAUSED}`}
                >
                  {ENROLLMENT_STATUS_LABELS[enrollment.status] ?? enrollment.status}
                </span>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-amber-400" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
