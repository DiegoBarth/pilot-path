import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { WeakSubject } from "../types";

interface WeakSubjectsPanelProps {
  weakSubjects: WeakSubject[];
}

export function WeakSubjectsPanel({ weakSubjects }: WeakSubjectsPanelProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/5 bg-[#1E2834]">
      <div className="border-b border-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Pontos de Atenção</h2>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        {weakSubjects.length === 0 ? (
          <p className="text-sm text-slate-500">
            Nenhum ponto de atenção identificado até agora.
          </p>
        ) : (
          weakSubjects.slice(0, 3).map((subject) => (
            <div key={subject.subjectId} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDAA3F]/10">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </span>

                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {subject.subjectName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {subject.accuracy.toFixed(0)}% de acerto
                  </p>
                </div>
              </div>

              <Link
                href="/certifications"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
              >
                Praticar
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
