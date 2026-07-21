import type { LucideIcon } from "lucide-react";
import {
  AltimeterWatermark,
  ChronographWatermark,
} from "@/components/shared/CockpitWatermarks";

interface QuickAccessStat {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

interface QuickAccessPanelProps {
  title?: string;
  stats: QuickAccessStat[];
}

export function QuickAccessPanel({ title, stats }: QuickAccessPanelProps) {
  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/5 bg-[#1E2834] p-5">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <AltimeterWatermark className="absolute -left-6 top-2 h-36 w-36 opacity-[0.06]" />
        <ChronographWatermark className="absolute -right-4 top-4 h-32 w-32 opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1E2834]/90" />
      </div>

      {title && (
        <h2 className="relative z-10 text-base font-semibold text-slate-200">
          {title}
        </h2>
      )}

      <div className="relative z-10 mt-auto grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.08] bg-[#0f1520]/70 p-3 text-center backdrop-blur-sm"
          >
            <stat.icon className="mx-auto mb-1.5 h-4 w-4 text-slate-400" />
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
