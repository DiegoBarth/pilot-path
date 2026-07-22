import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn, formatAccuracy } from "@/lib/utils";
import type { WeakSubject } from "../types";

interface WeakSubjectsPanelProps {
  weakSubjects: WeakSubject[];
}

export function WeakSubjectsPanel({ weakSubjects }: WeakSubjectsPanelProps) {
  return (
    <Panel>
      <PanelHeader title="Pontos de atenção" />

      <PanelBody className="flex flex-1 flex-col gap-1">
        {weakSubjects.length === 0 ? (
          <EmptyState message="Nenhum ponto de atenção identificado até agora." />
        ) : (
          weakSubjects.slice(0, 4).map((subject) => (
            <div
              key={subject.subjectId}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-200">
                    {subject.subjectName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatAccuracy(subject.accuracy, 0)} de acerto
                  </p>
                </div>
              </div>

              <Link
                href={`/study/subject/${subject.subjectId}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "shrink-0 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300",
                )}
              >
                Praticar
              </Link>
            </div>
          ))
        )}
      </PanelBody>
    </Panel>
  );
}
