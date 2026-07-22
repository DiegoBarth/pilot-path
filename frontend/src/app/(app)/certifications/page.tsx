"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { PageError } from "@/components/shared/PageError";
import { PageHeader } from "@/components/shared/PageHeader";
import { PageLoading } from "@/components/shared/PageLoading";
import { CertificationCard } from "@/features/certifications/components/CertificationCard";
import { useCertificationsPage } from "@/features/certifications/hooks/useCertificationsPage";

export default function CertificationsPage() {
  const { certifications, items } = useCertificationsPage();

  if (certifications.isLoading) {
    return <PageLoading message="Carregando certificações..." />;
  }

  if (certifications.isError) {
    return (
      <PageError message="Não foi possível carregar suas certificações. Tentar novamente." />
    );
  }

  return (
    <PageContainer variant="compact" constrained>
      <PageHeader
        title="Certificações"
        description="Acompanhe seu progresso e continue sua jornada de formação."
        className="mb-8"
      />

      {items.length === 0 ? (
        <p className="text-slate-500">Nenhuma certificação disponível no momento.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((certification) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
