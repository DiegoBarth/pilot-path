"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatElapsedTime } from "../lib/format-duration";

interface ExamTimerProps {
  elapsedSeconds: number;
  isActive?: boolean;
  className?: string;
}

export function ExamTimer({
  elapsedSeconds,
  isActive = true,
  className,
}: ExamTimerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold",
        isActive
          ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
          : "border-white/5 bg-surface-elevated text-slate-300",
        className,
      )}
      aria-live="polite"
      aria-label={`Tempo decorrido: ${formatElapsedTime(elapsedSeconds)}`}
    >
      <Clock className="h-3.5 w-3.5" />
      <span className="tabular-nums">{formatElapsedTime(elapsedSeconds)}</span>
    </div>
  );
}
