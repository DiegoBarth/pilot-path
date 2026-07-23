import { PageHeader } from "@/components/shared/PageHeader";
import type { EnrollmentSummary } from "@/features/enrollments/types";
import type { MockExamSummary } from "../types";
import type { SubjectWithAvailability } from "../lib/subject-availability";
import { MockExamsCreatePanel } from "./MockExamsCreatePanel";
import { MockExamsHistory } from "./MockExamsHistory";

interface MockExamsLandingProps {
  enrollments: EnrollmentSummary[];
  subjects: SubjectWithAvailability[];
  mockExams: MockExamSummary[];
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

export function MockExamsLanding({
  enrollments,
  subjects,
  mockExams,
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
}: MockExamsLandingProps) {
  return (
    <>
      <PageHeader
        title="Simulados"
        description="Pratique no formato da prova, acompanhe o tempo e revise seu desempenho ao final de cada simulado."
      />

      <MockExamsCreatePanel
        enrollments={enrollments}
        subjects={subjects}
        selectedCertification={selectedCertification}
        selectedSubject={selectedSubject}
        questionCount={questionCount}
        canStart={canStart}
        isCreating={isCreating}
        createError={createError}
        onCertificationChange={onCertificationChange}
        onSubjectChange={onSubjectChange}
        onQuestionCountChange={onQuestionCountChange}
        onStartExam={onStartExam}
      />

      <MockExamsHistory exams={mockExams} />
    </>
  );
}
