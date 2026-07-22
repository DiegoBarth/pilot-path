import { BookOpen, Clock, Layers } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { formatDate } from "@/lib/utils";
import { formatStudyTime } from "@/lib/study-utils";
import type { StudyHistorySession } from "../types";

interface SubjectStudyStatsProps {
  totalStudySessions: number;
  totalStudyMinutes: number;
  lastStudySession?: StudyHistorySession;
}

export function SubjectStudyStats({
  totalStudySessions,
  totalStudyMinutes,
  lastStudySession,
}: SubjectStudyStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        icon={BookOpen}
        label="Sessões de estudo"
        value={totalStudySessions}
        iconClassName="bg-amber-500/10 text-amber-500"
        className="rounded-xl border-slate-800"
      />

      <StatCard
        icon={Clock}
        label="Tempo estudado"
        value={formatStudyTime(totalStudyMinutes)}
        iconClassName="bg-sky-500/10 text-sky-400"
        className="rounded-xl border-slate-800"
      />

      <StatCard
        icon={Layers}
        label="Último estudo"
        value={
          lastStudySession
            ? formatDate(lastStudySession.startedAt)
            : "Ainda não estudada"
        }
        iconClassName="bg-emerald-500/10 text-emerald-400"
        className="rounded-xl border-slate-800 [&_p.text-2xl]:text-sm [&_p.text-2xl]:font-semibold"
      />
    </div>
  );
}
