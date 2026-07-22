"use client";

import { useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { FeaturePlaceholder } from "@/components/shared/FeaturePlaceholder";

export default function MockExamsPage() {
  const searchParams = useSearchParams();
  const hasSubjectContext = Boolean(searchParams.get("subjectId"));

  const description = hasSubjectContext
    ? "Pratique simulados no formato da prova para a matéria selecionada. Esta área estará disponível em breve."
    : "Pratique simulados completos no formato da prova para suas certificações. Esta área estará disponível em breve.";

  return (
    <PageContainer constrained>
      <FeaturePlaceholder
        title="Simulados"
        description={description}
        icon={FileText}
      />
    </PageContainer>
  );
}
