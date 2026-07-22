"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardsBackLinkProps {
  onClick?: () => void;
  className?: string;
}

export function FlashcardsBackLink({ onClick, className }: FlashcardsBackLinkProps) {
  const label = "Voltar para Flashcards";
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
    <Link href="/flashcards" className={styles}>
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
