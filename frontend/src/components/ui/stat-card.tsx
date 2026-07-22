import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  iconClassName?: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  iconClassName,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-white/5 bg-card p-5",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted",
          iconClassName,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
