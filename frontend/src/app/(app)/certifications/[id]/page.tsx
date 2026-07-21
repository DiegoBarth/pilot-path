"use client";

import { useParams } from "next/navigation";
import { CertificationHeader } from "@/features/certifications/components/CertificationHeader";
import { ProgressCircle } from "@/features/certifications/components/ProgressCircle";
import { CurriculumGrid } from "@/features/certifications/components/CurriculumGrid";
import { NextStepPanel } from "@/features/certifications/components/NextStepPanel";
import { useCertification } from "@/features/certifications/hooks/useCertification";
import { useEnrollCertification } from "@/features/certifications/hooks/useEnrollCertification";
import { useCertificationBreadcrumbs } from "@/hooks/use-breadcrumb-trails";

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Em Andamento",
  COMPLETED: "Concluído",
  PAUSED: "Pausado",
  DROPPED: "Abandonado"
};

export default function CertificationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const enrollCertification = useEnrollCertification();

  const {
    certification,
    subjects,
    studySessions,
    studiedSubjectIds,
    sessionsCountBySubjectId,
    progress,
    cancelEnrollment,
    enrollment
  } = useCertification(id);

  const isActiveEnrollment = ['ACTIVE', 'COMPLETED'].includes(enrollment?.status ?? '');

  const handleEnroll = () => {
    enrollCertification.mutate(id);
  };

  const handleCancel = () => {
    if (!enrollment) {
      return;
    }

    cancelEnrollment.mutate(enrollment.id);
  };

  useCertificationBreadcrumbs(certification.data);

  if (certification.isLoading || subjects.isLoading) {
    return (
      <div className="p-8 text-slate-400">
        Carregando certificação...
      </div>
    );
  }

  if (certification.isError || !certification.data) {
    return (
      <div className="p-8 text-slate-400">
        Não foi possível carregar esta certificação.
        Tentar novamente.
      </div>
    );
  }

  const status = enrollment ? STATUS_LABELS[enrollment.status] : "Não Iniciado";

  const subjectList = subjects.data ?? [];
  const sessionList = studySessions.data?.data ?? [];

  return (
    <div className="px-6 pb-10 pt-3 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <CertificationHeader
          certification={certification.data}
          progress={progress}
          status={status}
          onEnroll={handleEnroll}
          onCancel={handleCancel}
          isUpdating={enrollCertification.isPending || cancelEnrollment.isPending}
        />

        {isActiveEnrollment && (
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

              <ProgressCircle
                percent={progress}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="min-h-[52px]">
                <h2 className="text-lg font-semibold text-white">
                  Próximo passo
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Continue de onde parou
                </p>
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
            {isActiveEnrollment
              ? "Continue seus estudos acompanhando o progresso das matérias."
              : "Conheça as matérias que fazem parte desta certificação."
            }
          </p>

          <CurriculumGrid
            subjects={subjectList}
            studiedSubjectIds={studiedSubjectIds}
            sessionsCountBySubjectId={sessionsCountBySubjectId}
            isEnrolled={Boolean(isActiveEnrollment)}
          />
        </section>

      </div>
    </div>
  );
}