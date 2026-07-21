"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { CertificationHeader } from "@/features/certifications/components/CertificationHeader";
import { ProgressCircle } from "@/features/certifications/components/ProgressCircle";
import { CurriculumGrid } from "@/features/certifications/components/CurriculumGrid";
import { useCertification } from "@/features/certifications/hooks/useCertification";
import { QuickAccessPanel } from "@/components/shared/QuickAccessPanel";
import { useEnrollCertification } from "@/features/certifications/hooks/useEnrollCertification";

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

  const totalSubjects = subjectList.length;

  const studiedSubjects = studiedSubjectIds.size;

  return (
    <div className="px-6 pb-10 pt-3 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para certificações
        </Link>

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
                  Acesso Rápido
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Instrumentos e resumo
                </p>
              </div>

              <div className="min-h-[280px] flex-1">
                <QuickAccessPanel
                  stats={[
                    {
                      icon: BookOpen,
                      value: totalSubjects,
                      label: "Matérias"
                    },
                    {
                      icon: CheckCircle2,
                      value: studiedSubjects,
                      label: "Estudadas"
                    }
                  ]}
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