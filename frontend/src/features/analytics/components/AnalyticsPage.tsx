import { BarChart2 } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { FeaturePlaceholder } from "@/components/shared/FeaturePlaceholder";

export function AnalyticsPage() {
  return (
    <PageContainer constrained>
      <FeaturePlaceholder
        title="Estatísticas"
        description="Acompanhe seu desempenho, evolução por matéria e métricas detalhadas dos seus estudos. Esta área estará disponível em breve."
        icon={BarChart2}
      />
    </PageContainer>
  );
}
