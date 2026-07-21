"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type ActivityType =
  | "READING"
  | "EXERCISES"
  | "FLASHCARDS"
  | "VIDEO"
  | "SIMULATOR"
  | "MOCK_EXAM"
  | "OTHER";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  href?: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const ACTIVITY_LABELS: Record<ActivityType, string> = {
  READING: "Leitura",
  EXERCISES: "Exercícios",
  FLASHCARDS: "Flashcards",
  VIDEO: "Vídeo",
  SIMULATOR: "Simulador",
  MOCK_EXAM: "Simulado",
  OTHER: "Estudo",
};

const ACTIVITY_DOT_COLORS: Record<ActivityType, string> = {
  READING: "bg-sky-500",
  EXERCISES: "bg-amber-500",
  FLASHCARDS: "bg-emerald-500",
  VIDEO: "bg-violet-500",
  SIMULATOR: "bg-teal-500",
  MOCK_EXAM: "bg-orange-500",
  OTHER: "bg-slate-500",
};

function ActivityRow({ activity }: { activity: Activity }) {
  const dotColor =
    ACTIVITY_DOT_COLORS[activity.type] ?? ACTIVITY_DOT_COLORS.OTHER;

  const rowContent = (
    <>
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor}`}
        aria-hidden
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-200">
          {activity.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-slate-500">
          {ACTIVITY_LABELS[activity.type] ?? activity.type} · {activity.description} · {activity.date}
        </p>
      </div>

      {activity.href && (
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-amber-400" />
      )}
    </>
  );

  if (activity.href) {
    return (
      <Link
        href={activity.href}
        className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.03]"
      >
        {rowContent}
      </Link>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl px-3 py-2.5">
      {rowContent}
    </div>
  );
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-[#1E2834]">
      <div className="border-b border-white/5 px-6 py-4">
        <h2 className="text-base font-semibold text-white">
          Atividade recente
        </h2>
      </div>

      <div className="flex-1 p-2">
        {activities.length === 0 ? (
          <p className="px-4 py-6 text-sm text-slate-500">
            Nenhuma atividade recente.
          </p>
        ) : (
          <div className="flex flex-col">
            {activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
