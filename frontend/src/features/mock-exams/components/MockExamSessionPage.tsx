"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { PageError } from "@/components/shared/PageError";
import { PageLoading } from "@/components/shared/PageLoading";
import { Panel, PanelBody } from "@/components/ui/panel";
import { getErrorMessage } from "@/lib/api/errors";
import { AlternativesRadioGroup } from "./AlternativesRadioGroup";
import { ExamHeader } from "./ExamHeader";
import { ExamResult } from "./ExamResult";
import { QuestionDisplay } from "./QuestionDisplay";
import { WizardNavigation } from "./WizardNavigation";
import { useMockExamSessionPage } from "../hooks/useMockExamSessionPage";

interface MockExamSessionPageProps {
  examId: string;
}

export function MockExamSessionPage({ examId }: MockExamSessionPageProps) {
  const {
    examQuery,
    exam,
    finishedExam,
    isFinished,
    isFinishing,
    finishError,
    currentIndex,
    currentQuestion,
    questions,
    answers,
    answeredCount,
    allAnswered,
    elapsedSeconds,
    handleSelectAlternative,
    handlePrevious,
    handleNext,
    handleGoToQuestion,
    handleFinish,
    handleExit,
  } = useMockExamSessionPage(examId);

  if (examQuery.isLoading) {
    return <PageLoading message="Carregando simulado..." />;
  }

  if (examQuery.isError || !exam) {
    return (
      <PageError message={getErrorMessage(examQuery.error, "Simulado não encontrado.")} />
    );
  }

  if (isFinished && finishedExam) {
    return (
      <PageContainer variant="review">
        <ExamResult exam={finishedExam} />
      </PageContainer>
    );
  }

  if (!currentQuestion) {
    return <PageError message="Este simulado não possui questões." />;
  }

  const answeredByIndex = questions.map(
    (item) => Boolean(answers[item.questionId]),
  );

  return (
    <PageContainer variant="review">
      <div className="mx-auto max-w-4xl space-y-8">
        <ExamHeader
          subjectName={exam.subject?.name ?? "Simulado"}
          currentQuestion={currentIndex + 1}
          totalQuestions={questions.length}
          answeredCount={answeredCount}
          elapsedSeconds={elapsedSeconds}
          isTimerActive
          onExit={handleExit}
        />

        <Panel>
          <PanelBody className="space-y-8 p-6 md:p-8">
            <QuestionDisplay
              question={currentQuestion.question}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
            />

            <AlternativesRadioGroup
              name={`question-${currentQuestion.questionId}`}
              alternatives={currentQuestion.question.alternatives}
              selectedAlternativeId={answers[currentQuestion.questionId]}
              onSelect={handleSelectAlternative}
            />

            {finishError && (
              <p className="text-sm text-red-400">
                {getErrorMessage(finishError, "Não foi possível finalizar o simulado.")}
              </p>
            )}

            <WizardNavigation
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              answeredByIndex={answeredByIndex}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onGoToQuestion={handleGoToQuestion}
              onFinish={handleFinish}
              canFinish={allAnswered}
              isFinishing={isFinishing}
            />
          </PanelBody>
        </Panel>
      </div>
    </PageContainer>
  );
}
