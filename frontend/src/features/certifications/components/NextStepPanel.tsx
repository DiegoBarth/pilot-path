"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Calendar, Clock, Play } from "lucide-react";
import { cn, formatRelativeDate } from "@/lib/utils";
import type { CertificationSubject, StudySession } from "../types";

interface NextStepPanelProps {
  certificationId: string;
  subjects: CertificationSubject[];
  studiedSubjectIds: Set<string>;
  studySessions: StudySession[];
  targetExamDate?: string;
}

function getSessionDurationMinutes(session: StudySession) {
  if (!session.endedAt) {
    return 0;
  }

  const startedAt = new Date(session.startedAt).getTime();
  const endedAt = new Date(session.endedAt).getTime();

  if (Number.isNaN(startedAt) || Number.isNaN(endedAt)) {
    return 0;
  }

  return Math.max(0, Math.round((endedAt - startedAt) / 1000 / 60));
}

function formatStudyTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}min`;
}

function getDaysUntilExam(targetExamDate: string) {
  const target = new Date(targetExamDate);
  target.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatExamCountdown(days: number) {
  if (days < 0) {
    return "Prova já realizada";
  }

  if (days === 0) {
    return "Prova hoje";
  }

  if (days === 1) {
    return "Prova: 1 dia restante";
  }

  return `Prova: ${days} dias restantes`;
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
    <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-[#1E2834] p-5">
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
              "mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition",
              "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400",
            )}
          >
            <Play className="h-4 w-4" />
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
    </div>
  );
}
