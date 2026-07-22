import Link from "next/link";
import { Layers, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, PanelBody } from "@/components/ui/panel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubjectPracticePanelProps {
  flashcardsHref: string;
}

export function SubjectPracticePanel({
  flashcardsHref,
}: SubjectPracticePanelProps) {
  return (
    <Panel className="rounded-xl border-slate-800 shadow-sm">
      <PanelBody className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Praticar</h2>

        <div className="space-y-3">
          <Button variant="cta" size="xl" className="w-full rounded-lg">
            <Play />
            Iniciar Simulado
          </Button>

          <Link
            href={flashcardsHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "xl" }),
              "w-full rounded-lg border-slate-700 bg-slate-800 py-3 text-slate-200 hover:bg-slate-700 hover:text-white",
            )}
          >
            <Layers className="text-amber-500" />
            Revisar Flashcards
          </Link>
        </div>
      </PanelBody>
    </Panel>
  );
}
