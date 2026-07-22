import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-white/5 bg-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface PanelHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function PanelHeader({
  title,
  description,
  icon: Icon,
  action,
  className,
}: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-white/5 px-6 py-4",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 shrink-0 text-amber-500" />}
          <h2 className="text-base font-semibold text-white">{title}</h2>
        </div>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

interface PanelBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function PanelBody({ children, className }: PanelBodyProps) {
  return <div className={cn("p-3", className)}>{children}</div>;
}
