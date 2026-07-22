import Link from "next/link";
import { BookOpen, Calendar, CalendarClock, Play, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CockpitWatermarkOverlay } from "@/components/shared/CockpitWatermarkOverlay";
import { cn, formatRelativeDate } from "@/lib/utils";
import { formatExamCountdown, getDaysUntilExam } from "@/lib/study-utils";
import type { EnrollmentSummary, RecentStudySession } from "../types";
import { buildStudyActivityHref } from "@/features/study/lib/activity-href";

interface DashboardHeroProps {
  lastSession?: RecentStudySession;
  activeEnrollmentsCount: number;
  totalSessions: number;
  enrollmentForLastSession?: EnrollmentSummary;
}

export function DashboardHero({
  lastSession,
  activeEnrollmentsCount,
  totalSessions,
  enrollmentForLastSession,
}: DashboardHeroProps) {
  const studyHref = lastSession
    ? buildStudyActivityHref({
        studyType: lastSession.studyType,
        subjectId: lastSession.subject.id,
        certificationId: lastSession.certification.id,
      })
    : undefined;

  const examCountdown = enrollmentForLastSession?.targetExamDate
    ? formatExamCountdown(getDaysUntilExam(enrollmentForLastSession.targetExamDate))
    : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-card lg:grid lg:grid-cols-5">
      <div className="flex flex-col justify-between p-6 lg:col-span-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Próximo passo
          </p>

          {lastSession ? (
            <>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {lastSession.subject.name}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {lastSession.certification.name}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Última sessão: {formatRelativeDate(lastSession.startedAt)}
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Comece sua jornada
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Inscreva-se em uma certificação e registre sua primeira sessão de estudo.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {studyHref ? (
            <Link
              href={studyHref}
              className={cn(buttonVariants({ variant: "cta", size: "lg" }))}
            >
              <Play className="mr-2 h-4 w-4" />
              Continuar estudo
            </Link>
          ) : (
            <Link
              href="/certifications"
              className={cn(buttonVariants({ variant: "cta", size: "lg" }))}
            >
              Explorar certificações
            </Link>
          )}

          <Link
            href="/questions/quick-quiz"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-slate-700 text-slate-200 hover:bg-slate-800",
            )}
          >
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            Quiz Rápido
          </Link>
        </div>
      </div>

      <div className="relative flex min-h-[220px] flex-col justify-end overflow-hidden border-t border-white/5 p-5 lg:col-span-2 lg:min-h-0 lg:border-l lg:border-t-0">
        <CockpitWatermarkOverlay />

        <div className="relative z-10 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/[0.08] bg-surface-deep/70 p-3 text-center backdrop-blur-sm">
            <BookOpen className="mx-auto mb-1 h-4 w-4 text-slate-400" />
            <p className="text-lg font-bold text-white">{activeEnrollmentsCount}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Certificações
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-surface-deep/70 p-3 text-center backdrop-blur-sm">
            <CalendarClock className="mx-auto mb-1 h-4 w-4 text-slate-400" />
            <p className="text-lg font-bold text-white">{totalSessions}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Sessões
            </p>
          </div>
        </div>

        {examCountdown && (
          <div className="relative z-10 mt-3 flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-200/90 backdrop-blur-sm">
            <Calendar className="h-4 w-4 shrink-0 text-amber-400" />
            <span>{examCountdown}</span>
          </div>
        )}
      </div>
    </div>
  );
}
