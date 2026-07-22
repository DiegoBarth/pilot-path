import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { EnrollmentStatusBadge } from "@/features/enrollments/components/EnrollmentStatusBadge";
import { filterActiveEnrollments } from "@/features/enrollments/lib/utils";
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
          <EmptyState message="Você ainda não está inscrito em nenhuma certificação." />
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
                <EnrollmentStatusBadge
                  status={enrollment.status}
                  variant="compact"
                  className="mt-1"
                />
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-amber-400" />
            </Link>
          ))
        )}
      </PanelBody>
    </Panel>
  );
}
