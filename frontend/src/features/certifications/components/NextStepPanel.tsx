"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Calendar, Clock, Play } from "lucide-react";
import { ActionCard } from "@/components/ui/action-card";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatRelativeDate } from "@/lib/utils";
import {
  formatExamCountdown,
  formatStudyTime,
  getDaysUntilExam,
  getSessionDurationMinutes,
} from "@/lib/study-utils";
import type { CertificationSubject, StudySession } from "../types";

interface NextStepPanelProps {
  certificationId: string;
  subjects: CertificationSubject[];
  studiedSubjectIds: Set<string>;
  studySessions: StudySession[];
  targetExamDate?: string;
}

export function NextStepPanel({
  certificationId,
  subjects,
  studiedSubjectIds,
  studySessions,
  targetExamDate,
}: NextStepPanelProps) {
  const {
    continueSubject,
    lastSessionLabel,
    totalStudyMinutes,
    totalSessions,
    examCountdown,
  } = useMemo(() => {
    const sortedSubjects = [...subjects].sort((a, b) => a.order - b.order);

    const lastSession = [...studySessions].sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    )[0];

    const nextUnstudied = sortedSubjects.find(
      (item) => !studiedSubjectIds.has(item.subject.id),
    );

    const subject =
      lastSession?.subject ??
      nextUnstudied?.subject ??
      sortedSubjects[0]?.subject;

    const minutes = studySessions.reduce(
      (total, session) => total + getSessionDurationMinutes(session),
      0,
    );

    const days = targetExamDate ? getDaysUntilExam(targetExamDate) : null;

    return {
      continueSubject: subject,
      lastSessionLabel: lastSession
        ? `Última sessão: ${formatRelativeDate(lastSession.startedAt)}`
        : "Nenhuma sessão registrada ainda",
      totalStudyMinutes: minutes,
      totalSessions: studySessions.length,
      examCountdown: days !== null ? formatExamCountdown(days) : null,
    };
  }, [subjects, studiedSubjectIds, studySessions, targetExamDate]);

  const studyHref = continueSubject
    ? `/study/subject/${continueSubject.id}?certificationId=${certificationId}`
    : undefined;

  return (
    <ActionCard>
      <div className="flex-1">
        {continueSubject ? (
          <>
            <p className="text-lg font-semibold text-white">
              {continueSubject.name}
            </p>
            <p className="mt-1 text-sm text-slate-400">{lastSessionLabel}</p>
          </>
        ) : (
          <p className="text-sm text-slate-400">
            Nenhuma matéria disponível nesta certificação.
          </p>
        )}

        {studyHref && (
          <Link
            href={studyHref}
            className={cn(
              buttonVariants({ variant: "cta", size: "lg" }),
              "mt-5 w-full rounded-xl",
            )}
          >
            <Play />
            Continuar estudo
          </Link>
        )}
      </div>

      <div className="mt-6 space-y-3 border-t border-white/5 pt-4">
        {examCountdown && (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="h-4 w-4 shrink-0 text-amber-400" />
            <span>{examCountdown}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="h-4 w-4 shrink-0 text-slate-500" />
          <span>
            {formatStudyTime(totalStudyMinutes)} estudadas · {totalSessions}{" "}
            {totalSessions === 1 ? "sessão" : "sessões"}
          </span>
        </div>
      </div>
    </ActionCard>
  );
}
