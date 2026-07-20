import { useId } from "react";

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  trackColor?: string;
}

export function ProgressRing({
  percent,
  size = 140,
  strokeWidth = 12,
  label = "Completo",
  trackColor = "#1e293b",
}: ProgressRingProps) {
  const gradientId = useId();
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth * 1.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center drop-shadow-[0_0_28px_rgba(245,158,11,0.45)]"
      style={{ height: size, width: size }}
    >
      <svg height={size} width={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <circle
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span
          className="font-bold tracking-tight text-slate-50"
          style={{ fontSize: size >= 180 ? "2.25rem" : "1.75rem" }}
        >
          {Math.round(clampedPercent)}%
        </span>
        <span className="mt-0.5 text-xs font-medium text-slate-400">
          {label}
        </span>
      </div>
    </div>
  );
}
