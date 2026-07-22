import { CheckCircle2, Layers, Target } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { formatAccuracy } from "@/lib/utils";
import type { FlashcardOverview } from "../types";

interface FlashcardsOverviewCardsProps {
  overview?: FlashcardOverview;
}

export function FlashcardsOverviewCards({ overview }: FlashcardsOverviewCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        icon={Layers}
        label="Para revisar"
        value={overview?.dueTodayCount ?? 0}
        iconClassName="bg-amber-500/10 text-amber-400"
      />

      <StatCard
        icon={CheckCircle2}
        label="Revisados hoje"
        value={overview?.reviewedTodayCount ?? 0}
        iconClassName="bg-teal-500/10 text-teal-400"
      />

      <StatCard
        icon={Target}
        label="Taxa de acerto"
        value={formatAccuracy(overview?.accuracyRate ?? 0)}
        iconClassName="bg-sky-500/10 text-sky-400"
      />
    </div>
  );
}
