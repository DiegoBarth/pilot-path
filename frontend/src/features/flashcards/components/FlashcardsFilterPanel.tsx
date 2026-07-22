import { Filter, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { SelectField } from "@/components/ui/select-field";
import { formatCountLabel } from "@/lib/utils";
import type { EnrollmentSummary } from "@/features/enrollments/types";
import type { FlashcardOverview } from "../types";

interface SubjectOption {
  id: string;
  name: string;
}

interface FlashcardsFilterPanelProps {
  enrollments: EnrollmentSummary[];
  subjects: SubjectOption[];
  selectedCertification: string;
  selectedSubject: string;
  overview?: FlashcardOverview;
  isStarting: boolean;
  onCertificationChange: (certificationId: string) => void;
  onSubjectChange: (subjectId: string) => void;
  onStartReview: () => void;
}

export function FlashcardsFilterPanel({
  enrollments,
  subjects,
  selectedCertification,
  selectedSubject,
  overview,
  isStarting,
  onCertificationChange,
  onSubjectChange,
  onStartReview,
}: FlashcardsFilterPanelProps) {
  const availableCount = overview?.availableCount ?? 0;

  return (
    <Panel>
      <PanelHeader
        title="Iniciar revisão"
        description="Escolha quais flashcards deseja revisar."
        icon={Filter}
        className="flex-col items-start gap-2 sm:flex-row sm:items-center"
      />

      <PanelBody className="space-y-6 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Certificação"
            value={selectedCertification}
            onChange={(event) => onCertificationChange(event.target.value)}
          >
            <option value="">Todas as certificações</option>
            {enrollments.map((enrollment) => (
              <option key={enrollment.id} value={enrollment.certificationId}>
                {enrollment.certification.name}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Matéria"
            value={selectedSubject}
            disabled={subjects.length === 0}
            onChange={(event) => onSubjectChange(event.target.value)}
          >
            <option value="">Todas as matérias</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">
              {formatCountLabel(
                availableCount,
                "flashcard disponível",
                "flashcards disponíveis",
              )}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {overview?.totalCount ?? 0} no total neste filtro · você poderá
              avaliar seu desempenho após cada resposta.
            </p>
          </div>

          <Button
            variant="cta"
            size="xl"
            disabled={availableCount === 0 || isStarting}
            onClick={onStartReview}
          >
            <Play className="fill-current" />
            Começar revisão
          </Button>
        </div>
      </PanelBody>
    </Panel>
  );
}
