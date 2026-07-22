import { cn } from "@/lib/utils";

interface ActionCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ActionCard({ children, className }: ActionCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/5 bg-card p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
