"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { PageError } from "@/components/shared/PageError";
import { PageLoading } from "@/components/shared/PageLoading";
import { SubjectStudyLanding } from "./SubjectStudyLanding";
import { useSubjectStudyPage } from "../hooks/useSubjectStudyPage";

export function SubjectStudyPage() {
  const {
    subject,
    sessions,
    totalStudyMinutes,
    totalStudySessions,
    lastStudySession,
    flashcardsHref,
    isLoading,
    isError,
  } = useSubjectStudyPage();

  if (isLoading) {
    return <PageLoading message="Carregando matéria..." />;
  }

  if (isError || !subject) {
    return (
      <PageError message="Não foi possível carregar o conteúdo desta matéria." />
    );
  }

  return (
    <PageContainer constrained>
      <SubjectStudyLanding
        subject={subject}
        sessions={sessions}
        totalStudySessions={totalStudySessions}
        totalStudyMinutes={totalStudyMinutes}
        lastStudySession={lastStudySession}
        flashcardsHref={flashcardsHref}
      />
    </PageContainer>
  );
}
