"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { PageLoading } from "@/components/shared/PageLoading";
import { ReviewContainer } from "./ReviewContainer";
import { FlashcardsLanding } from "./FlashcardsLanding";
import { useFlashcardsPage } from "../hooks/useFlashcardsPage";

export function FlashcardsPage() {
  const {
    isLoading,
    isReviewing,
    sessionCards,
    sessionStats,
    currentSubject,
    activeEnrollments,
    availableSubjects,
    overview,
    reviewQueue,
    selectedCertification,
    selectedSubject,
    handleCertificationChange,
    handleSubjectChange,
    handleStartReview,
    handleExitReview,
    handleSessionSaved,
  } = useFlashcardsPage();

  if (isLoading) {
    return <PageLoading message="Carregando flashcards..." />;
  }

  if (isReviewing && sessionCards.length > 0) {
    return (
      <PageContainer variant="review">
        <ReviewContainer
          cards={sessionCards}
          sessionContext={sessionStats.sessionContext}
          subjectName={currentSubject?.name ?? "Todas as matérias"}
          reviewedTodayBaseline={sessionStats.reviewedTodayBaseline}
          dailyGoal={sessionStats.dailyGoal}
          onSessionSaved={handleSessionSaved}
          onExit={handleExitReview}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer constrained>
      <FlashcardsLanding
        enrollments={activeEnrollments}
        subjects={availableSubjects}
        overview={overview.data}
        selectedCertification={selectedCertification}
        selectedSubject={selectedSubject}
        isStarting={reviewQueue.isFetching}
        onCertificationChange={handleCertificationChange}
        onSubjectChange={handleSubjectChange}
        onStartReview={handleStartReview}
      />
    </PageContainer>
  );
}
