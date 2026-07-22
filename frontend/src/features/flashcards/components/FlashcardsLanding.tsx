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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Flashcards
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Revise conceitos importantes, teste sua memória e acompanhe seu
          desempenho ao longo dos estudos.
        </p>
      </div>

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
