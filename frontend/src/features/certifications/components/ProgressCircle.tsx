import { CheckCircle2, ClipboardList, Clock, PlaneLanding, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { AttitudeIndicator } from "@/components/shared/AttitudeIndicator";

interface ProgressCircleProps {
  percent: number;
}

const RING_SIZE = 190;

const ORBIT_NODES: {
  angle: number;
  icon: LucideIcon;
  tone: "amber" | "teal";
}[] = [
    { angle: 305, icon: Clock, tone: "amber" },
    { angle: 255, icon: CheckCircle2, tone: "amber" },
    { angle: 210, icon: ClipboardList, tone: "amber" },
    { angle: 55, icon: CheckCircle2, tone: "teal" },
    { angle: 102, icon: ShieldCheck, tone: "teal" },
    { angle: 155, icon: PlaneLanding, tone: "teal" },
  ];

const glowByTone = {
  amber: "border-amber-400/50 bg-card text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.5)]",
  teal: "border-teal-400/50 bg-card text-teal-400 shadow-[0_0_14px_rgba(45,212,191,0.45)]",
};

export function ProgressCircle({ percent }: ProgressCircleProps) {
  const box = RING_SIZE + 56;

  return (
    <div className="relative flex h-full min-h-[260px] w-full items-center overflow-hidden rounded-2xl border border-white/5 bg-card p-6">
      <div className="relative z-10 shrink-0" style={{ height: box, width: box }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ProgressRing
            percent={percent}
            size={RING_SIZE}
            strokeWidth={12}
            label="Complete"
            trackColor="var(--muted)"
          />
        </div>

        {ORBIT_NODES.map((node, index) => {
          const angle = (node.angle * Math.PI) / 180;
          const orbitR = RING_SIZE / 2 + 15;
          const cx = box / 2 + orbitR * Math.sin(angle);
          const cy = box / 2 - orbitR * Math.cos(angle);
          const Icon = node.icon;

          return (
            <div
              key={index}
              style={{ left: cx, top: cy }}
              className={cn(
                "absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border",
                glowByTone[node.tone]
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute" style={{ right: '-65px', transform: 'rotate(-25deg) scale(2)', filter: 'opacity(0.3)' }}>
        <div className="h-full max-h-[240px] w-full max-w-[240px]">
          <AttitudeIndicator />
        </div>
      </div>
    </div>
  );
}