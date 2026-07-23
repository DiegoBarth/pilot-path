"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { PageLoading } from "@/components/shared/PageLoading";
import { MockExamsLanding } from "./MockExamsLanding";
import { useMockExamsPage } from "../hooks/useMockExamsPage";

export function MockExamsPage() {
  const {
    isLoading,
    activeEnrollments,
    availableSubjects,
    mockExams,
    selectedCertification,
    selectedSubject,
    questionCount,
    canStart,
    isCreating,
    createError,
    handleCertificationChange,
    handleSubjectChange,
    handleQuestionCountChange,
    handleStartExam,
  } = useMockExamsPage();

  if (isLoading) {
    return <PageLoading message="Carregando simulados..." />;
  }

  return (
    <PageContainer constrained>
      <MockExamsLanding
        enrollments={activeEnrollments}
        subjects={availableSubjects}
        mockExams={mockExams}
        selectedCertification={selectedCertification}
        selectedSubject={selectedSubject}
        questionCount={questionCount}
        canStart={canStart}
        isCreating={isCreating}
        createError={createError}
        onCertificationChange={handleCertificationChange}
        onSubjectChange={handleSubjectChange}
        onQuestionCountChange={handleQuestionCountChange}
        onStartExam={handleStartExam}
      />
    </PageContainer>
  );
}
