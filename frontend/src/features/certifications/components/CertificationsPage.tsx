"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageError } from "@/components/shared/PageError";
import { PageHeader } from "@/components/shared/PageHeader";
import { PageLoading } from "@/components/shared/PageLoading";
import { CertificationCard } from "./CertificationCard";
import { useCertificationsPage } from "../hooks/useCertificationsPage";

export function CertificationsPage() {
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
        <EmptyState
          message="Nenhuma certificação disponível no momento."
          className="px-0"
        />
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
