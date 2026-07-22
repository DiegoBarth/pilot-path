import {
  AltimeterWatermark,
  AttitudeWatermark,
  ChronographWatermark,
} from "@/components/shared/CockpitWatermarks";
import { cn } from "@/lib/utils";

interface CockpitWatermarkOverlayProps {
  className?: string;
}

export function CockpitWatermarkOverlay({
  className,
}: CockpitWatermarkOverlayProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <AltimeterWatermark className="absolute -left-8 -top-4 h-48 w-48" />
      <ChronographWatermark className="absolute -right-6 top-0 h-44 w-44" />
      <AttitudeWatermark className="absolute -bottom-6 left-1/2 h-28 w-auto -translate-x-1/2" />
      <div className="absolute inset-0 bg-gradient-to-br from-card/40 via-card/70 to-surface-deep/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(245,158,11,0.06),transparent_45%)]" />
    </div>
  );
}
