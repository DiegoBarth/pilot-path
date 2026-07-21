import { Award, BookOpen, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LearningStatistics } from "../types";

interface AccuracyStripProps {
  data?: LearningStatistics;
}

const METRICS = [
  {
    key: "flashcardAccuracy" as const,
    label: "Flashcards",
    icon: Target,
    iconClass: "text-amber-500",
  },
  {
    key: "questionAccuracy" as const,
    label: "Questões",
    icon: BookOpen,
    iconClass: "text-slate-400",
  },
  {
    key: "mockExamPerformance" as const,
    label: "Simulados",
    icon: Award,
    iconClass: "text-amber-500",
  },
];

export function AccuracyStrip({ data }: AccuracyStripProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {METRICS.map((metric) => (
        <div
          key={metric.key}
          className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#1E2834] px-5 py-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0f1520]">
            <metric.icon className={cn("h-5 w-5", metric.iconClass)} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>
            <p className="text-2xl font-bold text-white">
              {(data?.[metric.key] ?? 0).toFixed(1)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
