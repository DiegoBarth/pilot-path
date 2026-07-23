import { Play, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { SelectField } from "@/components/ui/select-field";
import { getErrorMessage } from "@/lib/api/errors";
import type { EnrollmentSummary } from "@/features/enrollments/types";
import {
  DEFAULT_MOCK_EXAM_QUESTION_COUNT,
} from "../constants";
import {
  getSelectableQuestionCounts,
  type SubjectWithAvailability,
} from "../lib/subject-availability";

interface MockExamsCreatePanelProps {
  enrollments: EnrollmentSummary[];
  subjects: SubjectWithAvailability[];
  selectedCertification: string;
  selectedSubject: string;
  questionCount: number;
  canStart: boolean;
  isCreating: boolean;
  createError?: unknown;
  onCertificationChange: (certificationId: string) => void;
  onSubjectChange: (subjectId: string) => void;
  onQuestionCountChange: (count: number) => void;
  onStartExam: () => void;
}

function formatSubjectLabel(subject: SubjectWithAvailability) {
  if (subject.isAvailable) {
    return subject.name;
  }

  if (subject.questionCount === 0) {
    return `${subject.name} (sem questões)`;
  }

  return `${subject.name} (${subject.questionCount} questões — insuficiente)`;
}

export function MockExamsCreatePanel({
  enrollments,
  subjects,
  selectedCertification,
  selectedSubject,
  questionCount,
  canStart,
  isCreating,
  createError,
  onCertificationChange,
  onSubjectChange,
  onQuestionCountChange,
  onStartExam,
}: MockExamsCreatePanelProps) {
  const selectedSubjectData = subjects.find(
    (subject) => subject.id === selectedSubject,
  );
  const questionCountOptions = selectedSubjectData
    ? getSelectableQuestionCounts(selectedSubjectData.questionCount)
    : [];
  const hasAvailableSubjects = subjects.some((subject) => subject.isAvailable);

  return (
    <Panel>
      <PanelHeader
        title="Iniciar simulado"
        description="Escolha a matéria e a quantidade de questões para gerar um simulado aleatório."
        icon={SlidersHorizontal}
      />

      <PanelBody className="space-y-6 p-6">
        <div className="grid gap-5 md:grid-cols-3">
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
            disabled={subjects.length === 0 || !hasAvailableSubjects}
            onChange={(event) => onSubjectChange(event.target.value)}
          >
            <option value="">
              {hasAvailableSubjects
                ? "Selecione uma matéria"
                : "Nenhuma matéria com questões"}
            </option>
            {subjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
                disabled={!subject.isAvailable}
              >
                {formatSubjectLabel(subject)}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Quantidade de questões"
            value={String(questionCount)}
            disabled={!selectedSubject || questionCountOptions.length === 0}
            onChange={(event) =>
              onQuestionCountChange(Number(event.target.value))
            }
          >
            {questionCountOptions.map((count) => (
              <option key={count} value={count}>
                {count} questões
                {count === DEFAULT_MOCK_EXAM_QUESTION_COUNT ? " (padrão)" : ""}
              </option>
            ))}
          </SelectField>
        </div>

        {createError != null && (
          <p className="text-sm text-red-400">
            {getErrorMessage(createError, "Não foi possível gerar o simulado.")}
          </p>
        )}

        <div className="flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            O simulado será gerado com questões aleatórias da matéria selecionada.
            Você poderá navegar entre as questões antes de finalizar.
          </p>

          <Button
            variant="cta"
            size="xl"
            disabled={!canStart || isCreating}
            onClick={onStartExam}
          >
            <Play className="fill-current" />
            {isCreating ? "Gerando simulado..." : "Começar simulado"}
          </Button>
        </div>
      </PanelBody>
    </Panel>
  );
}
