"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Filter, Layers, Play, Target } from "lucide-react";
import { ReviewContainer } from "@/features/flashcards/components/ReviewContainer";
import {
  useFlashcardReviewQueue,
  useFlashcardsOverview,
} from "@/features/flashcards/hooks/useFlashcards";
import { getFlashcards } from "@/features/flashcards/api/flashcards.api";
import { getCertificationSubjects } from "@/features/certifications/api/certifications.api";
import { getEnrollments } from "@/features/dashboard/api/dashboard.api";
import { useFlashcardReviewBreadcrumbs } from "@/hooks/use-breadcrumb-trails";
import type { FlashcardReviewCard } from "@/features/flashcards/types";
import { resolveFlashcardSessionContext } from "@/features/flashcards/lib/session-context";

export default function FlashcardsPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const initialCertificationId = searchParams.get("certificationId") ?? "";
  const initialSubjectId = searchParams.get("subjectId") ?? "";

  const [selectedCertification, setSelectedCertification] = useState(initialCertificationId);
  const [selectedSubject, setSelectedSubject] = useState(initialSubjectId);
  const [isReviewing, setIsReviewing] = useState(false);
  const [sessionCards, setSessionCards] = useState<FlashcardReviewCard[]>([]);
  const [sessionStats, setSessionStats] = useState({
    reviewedTodayBaseline: 0,
    dailyGoal: 0,
    sessionContext: null as ReturnType<typeof resolveFlashcardSessionContext>,
  });

  const filters = useMemo(
    () => ({
      ...(selectedCertification && { certificationId: selectedCertification }),
      ...(selectedSubject && { subjectId: selectedSubject }),
    }),
    [selectedCertification, selectedSubject],
  );

  const enrollments = useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
  });

  const certificationSubjects = useQuery({
    queryKey: ["certification-subjects", selectedCertification],
    queryFn: () => getCertificationSubjects(selectedCertification),
    enabled: Boolean(selectedCertification),
  });

  const allFlashcards = useQuery({
    queryKey: ["flashcards-all"],
    queryFn: () => getFlashcards(),
  });

  const overview = useFlashcardsOverview(filters);
  const reviewQueue = useFlashcardReviewQueue(filters);

  const activeEnrollments = useMemo(
    () =>
      (enrollments.data ?? []).filter((enrollment) =>
        ["ACTIVE", "COMPLETED"].includes(enrollment.status),
      ),
    [enrollments.data],
  );

  const availableSubjects = useMemo(() => {
    if (selectedCertification) {
      return (certificationSubjects.data ?? []).map((item) => item.subject);
    }

    const subjectsMap = new Map<string, { id: string; name: string }>();

    for (const card of allFlashcards.data ?? []) {
      subjectsMap.set(card.subject.id, {
        id: card.subject.id,
        name: card.subject.name,
      });
    }

    return Array.from(subjectsMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR"),
    );
  }, [selectedCertification, certificationSubjects.data, allFlashcards.data]);

  const currentSubject = useMemo(
    () => availableSubjects.find((subject) => subject.id === selectedSubject) ?? null,
    [availableSubjects, selectedSubject],
  );

  useFlashcardReviewBreadcrumbs({
    subject: currentSubject,
    certificationId: selectedCertification || undefined,
  });

  const handleCertificationChange = (certificationId: string) => {
    setSelectedCertification(certificationId);
    setSelectedSubject("");
  };

  const handleStartReview = () => {
    const queue = reviewQueue.data ?? [];

    if (queue.length === 0) {
      return;
    }

    setSessionCards(queue);
    setSessionStats({
      reviewedTodayBaseline: overview.data?.reviewedTodayCount ?? 0,
      dailyGoal:
        (overview.data?.reviewedTodayCount ?? 0) + queue.length,
      sessionContext: resolveFlashcardSessionContext(
        queue,
        selectedSubject || undefined,
        selectedCertification || undefined,
      ),
    });
    setIsReviewing(true);
  };

  const handleExitReview = () => {
    setIsReviewing(false);
    setSessionCards([]);
    queryClient.invalidateQueries({ queryKey: ["flashcards-review-queue"] });
    queryClient.invalidateQueries({ queryKey: ["flashcards-overview"] });
    queryClient.invalidateQueries({ queryKey: ["learning-statistics"] });
    queryClient.invalidateQueries({ queryKey: ["subject-analytics"] });
    queryClient.invalidateQueries({ queryKey: ["recent-study-history"] });
    queryClient.invalidateQueries({ queryKey: ["certification-study-sessions"] });
  };

  const handleSessionSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["recent-study-history"] });
    queryClient.invalidateQueries({ queryKey: ["certification-study-sessions"] });
  };

  const isLoading =
    enrollments.isLoading ||
    overview.isLoading ||
    reviewQueue.isLoading ||
    (selectedCertification && certificationSubjects.isLoading) ||
    allFlashcards.isLoading;

  if (isLoading) {
    return (
      <div className="p-8 text-slate-400">
        Carregando flashcards...
      </div>
    );
  }

  if (isReviewing && sessionCards.length > 0) {
    return (
      <div className="px-6 pb-10 pt-6 md:px-8">
        <ReviewContainer
          cards={sessionCards}
          sessionContext={sessionStats.sessionContext}
          subjectName={currentSubject?.name ?? "Todas as matérias"}
          reviewedTodayBaseline={sessionStats.reviewedTodayBaseline}
          dailyGoal={sessionStats.dailyGoal}
          onSessionSaved={handleSessionSaved}
          onExit={handleExitReview}
        />
      </div>
    );
  }

  const overviewData = overview.data;
  const availableCount = overviewData?.availableCount ?? 0;

  return (
    <div className="px-6 pb-10 pt-3 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Flashcards
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Revise conceitos importantes, teste sua memória e acompanhe seu
            desempenho ao longo dos estudos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <OverviewCard
            icon={Layers}
            label="Para revisar"
            value={overviewData?.dueTodayCount ?? 0}
            iconClassName="bg-amber-500/10 text-amber-400"
          />

          <OverviewCard
            icon={CheckCircle2}
            label="Revisados hoje"
            value={overviewData?.reviewedTodayCount ?? 0}
            iconClassName="bg-teal-500/10 text-teal-400"
          />

          <OverviewCard
            icon={Target}
            label="Taxa de acerto"
            value={`${(overviewData?.accuracyRate ?? 0).toFixed(1)}%`}
            iconClassName="bg-sky-500/10 text-sky-400"
          />
        </div>

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
                <option value="">Todas as certificações</option>

                {activeEnrollments.map((enrollment) => (
                  <option
                    key={enrollment.id}
                    value={enrollment.certificationId}
                  >
                    {enrollment.certification.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Matéria
              </label>

              <select
                value={selectedSubject}
                onChange={(event) => setSelectedSubject(event.target.value)}
                disabled={availableSubjects.length === 0}
                className="w-full rounded-xl border border-slate-700 bg-[#152035] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Todas as matérias</option>

                {availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white">
                {availableCount}{" "}
                {availableCount === 1
                  ? "flashcard disponível"
                  : "flashcards disponíveis"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {overviewData?.totalCount ?? 0} no total neste filtro · você
                poderá avaliar seu desempenho após cada resposta.
              </p>
            </div>

            <button
              type="button"
              disabled={availableCount === 0 || reviewQueue.isFetching}
              onClick={handleStartReview}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:from-amber-300 hover:to-orange-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
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
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
