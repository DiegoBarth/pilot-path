import { cn } from "@/lib/utils";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <p className={cn("px-3 py-4 text-sm text-slate-500", className)}>
      {message}
    </p>
  );
}
