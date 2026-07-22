"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { PageError } from "@/components/shared/PageError";
import { PageLoading } from "@/components/shared/PageLoading";
import { CertificationHeader } from "./CertificationHeader";
import { ProgressCircle } from "./ProgressCircle";
import { CurriculumGrid } from "./CurriculumGrid";
import { NextStepPanel } from "./NextStepPanel";
import { useCertificationDetailsPage } from "../hooks/useCertificationDetailsPage";

export function CertificationDetailsPage() {
  const {
    id,
    certification,
    subjects,
    subjectList,
    sessionList,
    studiedSubjectIds,
    sessionsCountBySubjectId,
    progress,
    enrollment,
    isActive,
    displayStatus,
    isUpdating,
    handleEnroll,
    handleCancel,
  } = useCertificationDetailsPage();

  if (certification.isLoading || subjects.isLoading) {
    return <PageLoading message="Carregando certificação..." />;
  }

  if (certification.isError || !certification.data) {
    return (
      <PageError message="Não foi possível carregar esta certificação. Tentar novamente." />
    );
  }

  return (
    <PageContainer constrained>
      <CertificationHeader
        certification={certification.data}
        progress={progress}
        status={displayStatus}
        onEnroll={handleEnroll}
        onCancel={handleCancel}
        isUpdating={isUpdating}
      />

      {isActive && (
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <div className="min-h-[52px]">
              <h2 className="text-lg font-semibold text-white">
                Visão Geral do Progresso
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Acompanhe o progresso detalhado de cada matéria do seu currículo.
              </p>
            </div>

            <ProgressCircle percent={progress} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="min-h-[52px]">
              <h2 className="text-lg font-semibold text-white">Próximo passo</h2>
              <p className="mt-1 text-sm text-slate-400">Continue de onde parou</p>
            </div>

            <div className="min-h-[280px] flex-1">
              <NextStepPanel
                certificationId={id}
                subjects={subjectList}
                studiedSubjectIds={studiedSubjectIds}
                studySessions={sessionList}
                targetExamDate={enrollment?.targetExamDate}
              />
            </div>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-white">
          Currículo da Certificação
        </h2>

        <p className="mt-1 mb-5 text-sm text-slate-400">
          {isActive
            ? "Continue seus estudos acompanhando o progresso das matérias."
            : "Conheça as matérias que fazem parte desta certificação."}
        </p>

        <CurriculumGrid
          subjects={subjectList}
          studiedSubjectIds={studiedSubjectIds}
          sessionsCountBySubjectId={sessionsCountBySubjectId}
          isEnrolled={isActive}
        />
      </section>
    </PageContainer>
  );
}
