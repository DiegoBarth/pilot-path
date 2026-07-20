import type { LucideIcon } from "lucide-react";

interface QuickAccessStat {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

interface QuickAccessPanelProps {
  title?: string;
  stats: QuickAccessStat[];
}

function AttitudeThumb() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border border-white/5">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#1e3a5f] to-[#0f2744]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[#a16207] to-[#78350f]" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/80" />
      <div className="absolute left-[16%] top-1/2 h-0.5 w-[24%] -translate-y-1/2 rounded bg-amber-400" />
      <div className="absolute right-[16%] top-1/2 h-0.5 w-[24%] -translate-y-1/2 rounded bg-amber-400" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400" />
    </div>
  );
}

function HeadingThumb() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-[#0f1520]">
      <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-600/80" />
      <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-500/25" />
      <div className="absolute left-1/2 top-[12%] h-2.5 w-0.5 -translate-x-1/2 bg-amber-400" />
      <div className="absolute left-1/2 top-1/2 h-[38%] w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-[30deg] bg-amber-400" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400" />
    </div>
  );
}

export function QuickAccessPanel({ title, stats }: QuickAccessPanelProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/5 bg-[#1E2834] p-5">
      {title && (
        <h2 className="text-base font-semibold text-slate-200">{title}</h2>
      )}

      <div className="grid grid-cols-2 gap-3">
        <AttitudeThumb />
        <HeadingThumb />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/5 bg-[#0f1520] p-3 text-center"
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
