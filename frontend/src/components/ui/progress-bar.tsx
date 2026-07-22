import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  size?: "sm" | "md";
  className?: string;
  trackClassName?: string;
  indicatorClassName?: string;
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
};

export function ProgressBar({
  value,
  size = "md",
  className,
  trackClassName,
  indicatorClassName,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-muted",
        sizeClasses[size],
        className,
        trackClassName,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-primary transition-all duration-300",
          indicatorClassName,
        )}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

interface LabeledProgressBarProps extends ProgressBarProps {
  label: string;
  valueLabel?: string;
}

export function LabeledProgressBar({
  label,
  valueLabel,
  value,
  ...props
}: LabeledProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-500">{label}</span>
        {valueLabel && <span className="text-amber-400">{valueLabel}</span>}
      </div>
      <ProgressBar value={value} className="mt-2" {...props} />
    </div>
  );
}
