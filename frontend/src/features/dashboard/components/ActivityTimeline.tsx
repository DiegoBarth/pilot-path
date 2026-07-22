"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  STUDY_ACTIVITY_DOT_COLORS,
  STUDY_ACTIVITY_LABELS,
} from "@/features/study/constants/study-activity";
import type { StudyActivityType } from "@/domain/study-activity";

interface Activity {
  id: string;
  type: StudyActivityType;
  title: string;
  description: string;
  date: string;
  href?: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

function ActivityRow({ activity }: { activity: Activity }) {
  const dotColor =
    STUDY_ACTIVITY_DOT_COLORS[activity.type] ?? STUDY_ACTIVITY_DOT_COLORS.OTHER;

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
          {STUDY_ACTIVITY_LABELS[activity.type] ?? activity.type} ·{" "}
          {activity.description} · {activity.date}
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
    <Panel className="h-full">
      <PanelHeader title="Atividade recente" />

      <PanelBody className="flex-1 p-2">
        {activities.length === 0 ? (
          <EmptyState message="Nenhuma atividade recente." className="px-4 py-6" />
        ) : (
          <div className="flex flex-col">
            {activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </PanelBody>
    </Panel>
  );
}
