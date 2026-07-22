import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { Panel, PanelBody } from "@/components/ui/panel";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeaturePlaceholder({
  title,
  description,
  icon: Icon,
}: FeaturePlaceholderProps) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} description={description} />

      <Panel>
        <PanelBody className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
            <Icon className="h-7 w-7 text-amber-400" />
          </div>

          <div className="max-w-md space-y-2">
            <h2 className="text-lg font-semibold text-white">Em breve</h2>
            <p className="text-sm text-slate-400">
              Esta funcionalidade está em desenvolvimento e estará disponível em
              uma próxima atualização.
            </p>
          </div>

          <Link
            href={routes.dashboard}
            className={cn(buttonVariants({ variant: "cta", size: "xl" }))}
          >
            Voltar ao painel
          </Link>
        </PanelBody>
      </Panel>
    </div>
  );
}
