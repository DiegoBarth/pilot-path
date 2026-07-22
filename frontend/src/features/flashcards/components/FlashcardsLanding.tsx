import { PageHeader } from "@/components/shared/PageHeader";
import { FlashcardsFilterPanel } from "./FlashcardsFilterPanel";
import { FlashcardsOverviewCards } from "./FlashcardsOverviewCards";
import type { EnrollmentSummary } from "@/features/dashboard/types";
import type { FlashcardOverview } from "../types";

interface SubjectOption {
  id: string;
  name: string;
}

interface FlashcardsLandingProps {
  enrollments: EnrollmentSummary[];
  subjects: SubjectOption[];
  overview?: FlashcardOverview;
  selectedCertification: string;
  selectedSubject: string;
  isStarting: boolean;
  onCertificationChange: (certificationId: string) => void;
  onSubjectChange: (subjectId: string) => void;
  onStartReview: () => void;
}

export function FlashcardsLanding({
  enrollments,
  subjects,
  overview,
  selectedCertification,
  selectedSubject,
  isStarting,
  onCertificationChange,
  onSubjectChange,
  onStartReview,
}: FlashcardsLandingProps) {
  return (
    <>
      <PageHeader
        title="Flashcards"
        description="Revise conceitos importantes, teste sua memória e acompanhe seu desempenho ao longo dos estudos."
      />

      <FlashcardsOverviewCards overview={overview} />

      <FlashcardsFilterPanel
        enrollments={enrollments}
        subjects={subjects}
        overview={overview}
        selectedCertification={selectedCertification}
        selectedSubject={selectedSubject}
        isStarting={isStarting}
        onCertificationChange={onCertificationChange}
        onSubjectChange={onSubjectChange}
        onStartReview={onStartReview}
      />
    </>
  );
}
