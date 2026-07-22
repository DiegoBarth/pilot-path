import Link from "next/link";
import { BookOpen, Calendar, CalendarClock, Play, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatRelativeDate } from "@/lib/utils";
import { formatExamCountdown, getDaysUntilExam } from "@/lib/study-utils";
import {
  AltimeterWatermark,
  AttitudeWatermark,
  ChronographWatermark,
} from "@/components/shared/CockpitWatermarks";
import type { EnrollmentSummary, RecentStudySession } from "../types";
import { buildStudyActivityHref } from "../lib/activity-href";

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
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#1E2834] lg:grid lg:grid-cols-5">
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
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gradient-to-r from-amber-400 to-orange-500 font-semibold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:from-amber-300 hover:to-orange-400",
              )}
            >
              <Play className="mr-2 h-4 w-4" />
              Continuar estudo
            </Link>
          ) : (
            <Link
              href="/certifications"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gradient-to-r from-amber-400 to-orange-500 font-semibold text-slate-950 hover:from-amber-300 hover:to-orange-400",
              )}
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
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <AltimeterWatermark className="absolute -left-8 -top-4 h-48 w-48" />
          <ChronographWatermark className="absolute -right-6 top-0 h-44 w-44" />
          <AttitudeWatermark className="absolute -bottom-6 left-1/2 h-28 w-auto -translate-x-1/2" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E2834]/40 via-[#1E2834]/70 to-[#0f1520]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(245,158,11,0.06),transparent_45%)]" />
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/[0.08] bg-[#0f1520]/70 p-3 text-center backdrop-blur-sm">
            <BookOpen className="mx-auto mb-1 h-4 w-4 text-slate-400" />
            <p className="text-lg font-bold text-white">{activeEnrollmentsCount}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Certificações
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#0f1520]/70 p-3 text-center backdrop-blur-sm">
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
