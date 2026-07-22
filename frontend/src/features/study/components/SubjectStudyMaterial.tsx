import { BookOpen } from "lucide-react";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import type { Subject } from "../types";

interface SubjectStudyMaterialProps {
  subject: Subject;
}

export function SubjectStudyMaterial({ subject }: SubjectStudyMaterialProps) {
  return (
    <Panel className="rounded-xl border-slate-800 shadow-sm">
      <PanelHeader title="Material de Estudo" icon={BookOpen} />

      <PanelBody className="p-6">
        <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-950 shadow-inner">
          <div className="text-center">
            <BookOpen className="mx-auto h-8 w-8 text-slate-700" />
            <p className="mt-3 text-sm text-slate-600">Conteúdo didático em breve</p>
            <p className="mt-1 text-xs text-slate-700">
              O material de estudo desta matéria será disponibilizado aqui.
            </p>
          </div>
        </div>

        {subject.description && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-slate-200">
              Sobre esta matéria
            </h3>
            <p className="text-sm leading-6 text-slate-400">{subject.description}</p>
          </div>
        )}
      </PanelBody>
    </Panel>
  );
}
