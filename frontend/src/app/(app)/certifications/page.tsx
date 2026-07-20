"use client";

import { CertificationCard } from "@/features/certifications/components/CertificationCard";
import { useCertifications } from "@/features/certifications/hooks/useCertifications";

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Em Andamento",
  COMPLETED: "Concluído",
  PAUSED: "Pausado",
  DROPPED: "Abandonado",
};

export default function CertificationsPage() {
  const { certifications, enrollments } = useCertifications();

  if (certifications.isLoading || enrollments.isLoading) {
    return (
      <div className="p-8 text-slate-400">
        Carregando certificações...
      </div>
    );
  }

  if (certifications.isError) {
    return (
      <div className="p-8 text-slate-400">
        Não foi possível carregar suas certificações. Tentar novamente.
      </div>
    );
  }

  const enrollmentByCertificationId = new Map(
    (enrollments.data ?? []).map((enrollment) => [enrollment.certificationId, enrollment]),
  );

  const items = (certifications.data ?? []).map((certification) => {
    const enrollment = enrollmentByCertificationId.get(certification.id);

    return {
      id: certification.id,
      name: certification.name,
      description: certification.description ?? "",
      status: enrollment ? STATUS_LABELS[enrollment.status] : "Não Iniciado",
    };
  });

  return (
    <div className="px-6 pb-6 pt-2 md:px-8 md:pb-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-50">
            Certificações
          </h1>

          <p className="mt-2 text-slate-400">
            Acompanhe seu progresso e continue sua jornada de formação.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-slate-500">
            Nenhuma certificação disponível no momento.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {items.map(certification => (
              <CertificationCard
                key={certification.id}
                certification={certification}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}
