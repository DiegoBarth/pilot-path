"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface MockExamsBackLinkProps {
  onClick?: () => void;
  className?: string;
}

export function MockExamsBackLink({ onClick, className }: MockExamsBackLinkProps) {
  const label = "Voltar para Simulados";
  const styles = cn(
    "inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-white",
    className,
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={styles}>
        <ArrowLeft className="h-4 w-4" />
        {label}
      </button>
    );
  }

  return (
    <Link href={routes.mockExams} className={styles}>
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
