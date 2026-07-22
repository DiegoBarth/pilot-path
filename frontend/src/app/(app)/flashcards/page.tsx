"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Filter, Layers, Play, Target } from "lucide-react";
import { ReviewContainer } from "@/features/flashcards/components/ReviewContainer";
import { useFlashcardReviewBreadcrumbs } from "@/hooks/use-breadcrumb-trails";

const MOCK_CERTIFICATIONS = [
  {
    id: "cert-pp",
    name: "Piloto Privado (PP)",
  },
  {
    id: "cert-pc",
    name: "Piloto Comercial (PC)",
  },
];

const MOCK_SUBJECTS = [
  {
    id: "subject-flight-theory",
    certificationId: "cert-pp",
    name: "Teoria de Voo",
  },
  {
    id: "subject-air-regulations",
    certificationId: "cert-pp",
    name: "Regulamentos de Tráfego Aéreo",
  },
  {
    id: "subject-meteorology",
    certificationId: "cert-pp",
    name: "Meteorologia",
  },
  {
    id: "subject-air-navigation",
    certificationId: "cert-pc",
    name: "Navegação Aérea",
  },
];

export default function FlashcardsPage() {
  const searchParams = useSearchParams();

  const initialCertificationId = searchParams.get("certificationId") ?? "";

  const initialSubjectId = searchParams.get("subjectId") ?? "";

  const [selectedCertification, setSelectedCertification] = useState(initialCertificationId);

  const [selectedSubject, setSelectedSubject] = useState(initialSubjectId);

  const [isReviewing, setIsReviewing] = useState(false);

  const availableSubjects = useMemo(() => {
    if (!selectedCertification) {
      return MOCK_SUBJECTS;
    }

    return MOCK_SUBJECTS.filter(
      (subject) => subject.certificationId === selectedCertification,
    );
  }, [selectedCertification]);

  const currentSubject = useMemo(() => {
    return (
      MOCK_SUBJECTS.find(
        (subject) =>
          subject.id === selectedSubject,
      ) ?? null
    );
  }, [selectedSubject]);

  const availableFlashcards = useMemo((): number => {
    if (selectedSubject) {
      if (selectedSubject === "subject-flight-theory") {
        return 12;
      }

      if (
        selectedSubject === "subject-air-regulations"
      ) {
        return 8;
      }

      if (
        selectedSubject === "subject-meteorology"
      ) {
        return 10;
      }

      return 6;
    }

    if (selectedCertification) {
      return selectedCertification === "cert-pp" ? 30 : 6;
    }

    return 36;
  }, [
    selectedCertification,
    selectedSubject,
  ]);

  useFlashcardReviewBreadcrumbs({
    subject: currentSubject,
    certificationId: selectedCertification || undefined,
  });

  const handleCertificationChange = (certificationId: string) => {
    setSelectedCertification(certificationId);

    if (!certificationId) {
      return;
    }

    if (!selectedSubject) {
      return;
    }

    const subjectBelongsToCertification = MOCK_SUBJECTS.some(
      (subject) =>
        subject.id === selectedSubject &&
        subject.certificationId ===
        certificationId,
    );

    if (!subjectBelongsToCertification) {
      setSelectedSubject("");
    }
  };

  if (isReviewing) {
    return (
      <div className="px-6 pb-10 pt-6 md:px-8">
        <ReviewContainer
          subjectId={selectedSubject || undefined}
          subjectName={currentSubject?.name ?? "Todas as matérias"}
          onExit={() =>
            setIsReviewing(false)
          }
        />
      </div>
    );
  }

  return (
    <div className="px-6 pb-10 pt-3 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Flashcards
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Revise conceitos importantes, teste sua
            memória e acompanhe seu desempenho ao
            longo dos estudos.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <OverviewCard
            icon={Layers}
            label="Para revisar"
            value={24}
            iconClassName="bg-amber-500/10 text-amber-400"
          />

          <OverviewCard
            icon={CheckCircle2}
            label="Revisados hoje"
            value={18}
            iconClassName="bg-teal-500/10 text-teal-400"
          />

          <OverviewCard
            icon={Target}
            label="Taxa de acerto"
            value="82%"
            iconClassName="bg-sky-500/10 text-sky-400"
          />
        </div>

        {/* Review Setup */}
        <section className="rounded-2xl border border-white/5 bg-[#1E2834] p-6">
          <div className="flex flex-col gap-2 border-b border-white/5 pb-5">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-amber-500" />

              <h2 className="text-lg font-semibold text-white">
                Iniciar revisão
              </h2>
            </div>

            <p className="text-sm text-slate-400">
              Escolha quais flashcards deseja revisar.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* Certification */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Certificação
              </label>

              <select
                value={selectedCertification}
                onChange={(event) =>
                  handleCertificationChange(event.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-[#152035] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              >
                <option value="">
                  Todas as certificações
                </option>

                {MOCK_CERTIFICATIONS.map(
                  (certification) => (
                    <option
                      key={certification.id}
                      value={certification.id}
                    >
                      {certification.name}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Matéria
              </label>

              <select
                value={selectedSubject}
                onChange={(event) =>
                  setSelectedSubject(event.target.value)
                }
                disabled={availableSubjects.length === 0}
                className="w-full rounded-xl border border-slate-700 bg-[#152035] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  Todas as matérias
                </option>

                {availableSubjects.map(
                  (subject) => (
                    <option
                      key={subject.id}
                      value={subject.id}
                    >
                      {subject.name}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {/* Review Summary */}
          <div className="mt-6 flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white">
                {availableFlashcards}{" "}
                {availableFlashcards === 1
                  ? "flashcard disponível"
                  : "flashcards disponíveis"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Você poderá avaliar seu desempenho após
                cada resposta.
              </p>
            </div>

            <button
              type="button"
              disabled={
                availableFlashcards === 0
              }
              onClick={() =>
                setIsReviewing(true)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="h-4 w-4 fill-current" />
              Começar revisão
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

interface OverviewCardProps {
  icon: typeof Layers;
  label: string;
  value: number | string;
  iconClassName: string;
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  iconClassName,
}: OverviewCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#1E2834] p-5">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <span className="text-xs font-medium text-slate-400">
          {label}
        </span>

        <p className="mt-1 text-2xl font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}