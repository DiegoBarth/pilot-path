import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { filterActiveEnrollments } from "@/features/enrollments/lib/utils";
import {
  ENROLLMENT_STATUS_LABELS,
  ENROLLMENT_STATUS_STYLES,
} from "@/features/enrollments/constants";
import type { EnrollmentSummary } from "../types";

interface DashboardEnrollmentsProps {
  enrollments: EnrollmentSummary[];
}

export function DashboardEnrollments({ enrollments }: DashboardEnrollmentsProps) {
  const activeEnrollments = filterActiveEnrollments(enrollments);

  return (
    <Panel>
      <PanelHeader
        title="Minhas certificações"
        action={
          <Link
            href="/certifications"
            className="text-xs font-medium text-slate-400 transition hover:text-amber-400"
          >
            Ver todas
          </Link>
        }
      />

      <PanelBody className="flex flex-col gap-1">
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
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${ENROLLMENT_STATUS_STYLES[enrollment.status]}`}
                >
                  {ENROLLMENT_STATUS_LABELS[enrollment.status]}
                </span>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-amber-400" />
            </Link>
          ))
        )}
      </PanelBody>
    </Panel>
  );
}
