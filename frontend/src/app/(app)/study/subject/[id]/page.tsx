"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Play, Layers, Clock } from "lucide-react";
import { useSubjectStudy } from "@/features/study/hooks/useSubjectStudy";
import { useSubjectStudyBreadcrumbs } from "@/hooks/use-breadcrumb-trails";

const STUDY_TYPE_LABELS: Record<
  string,
  string
> = {
  READING: "Leitura",
  VIDEO: "Vídeo",
  SIMULATOR: "Simulador",
  FLASHCARDS: "Flashcards",
  MOCK_EXAM: "Simulado",
};

export default function SubjectStudyPage() {
  const {
    id: subjectId,
  } = useParams<{
    id: string;
  }>();

  const searchParams = useSearchParams();
  const certificationId = searchParams.get("certificationId") ?? undefined;

  const {
    subject,
    sessions,
    totalStudyMinutes,
    totalStudySessions,
    lastStudySession,
    getSessionDurationMinutes,
    isLoading,
    isError
  } = useSubjectStudy({
    subjectId,
    certificationId
  });

  useSubjectStudyBreadcrumbs({ subject, certificationId });

  if (isLoading) {
    return (
      <div className="p-8 text-slate-400">
        Carregando matéria...
      </div>
    );
  }

  if (isError || !subject) {
    return (
      <div className="p-8 text-slate-400">
        Não foi possível carregar o conteúdo desta matéria.
      </div>
    );
  }

  const totalHours = Math.floor(totalStudyMinutes / 60);

  const remainingMinutes = totalStudyMinutes % 60;

  const formattedStudyTime = totalHours > 0
    ? `${totalHours}h ${remainingMinutes}min`
    : `${remainingMinutes}min`;

  return (
    <div className="px-6 pb-10 pt-3 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {subject.name}
          </h1>

          <p className="mt-2 max-w-3xl text-slate-400">
            {subject.description ||
              "Continue seus estudos e acompanhe seu progresso nesta matéria."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl border border-slate-800 bg-[#1E2834] p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <BookOpen className="h-5 w-5 text-amber-500" />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Sessões de estudo
                </p>

                <p className="text-2xl font-bold text-white">
                  {totalStudySessions}
                </p>
              </div>

            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#1E2834] p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                <Clock className="h-5 w-5 text-sky-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Tempo estudado
                </p>

                <p className="text-2xl font-bold text-white">
                  {formattedStudyTime}
                </p>
              </div>

            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#1E2834] p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Layers className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Último estudo
                </p>

                <p className="text-sm font-semibold text-white">
                  {lastStudySession
                    ? new Date(
                      lastStudySession.startedAt,
                    ).toLocaleDateString(
                      "pt-BR",
                    )
                    : "Ainda não estudada"}
                </p>
              </div>

            </div>
          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-xl border border-slate-800 bg-[#1E2834] p-6 shadow-sm">

              <div className="mb-4 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-amber-500" />

                <h2 className="text-lg font-semibold text-white">
                  Material de Estudo
                </h2>
              </div>

              <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-950 shadow-inner">

                <div className="text-center">

                  <BookOpen className="mx-auto h-8 w-8 text-slate-700" />

                  <p className="mt-3 text-sm text-slate-600">
                    Conteúdo didático em breve
                  </p>

                  <p className="mt-1 text-xs text-slate-700">
                    O material de estudo desta matéria será disponibilizado aqui.
                  </p>

                </div>

              </div>

              {subject.description && (
                <div className="mt-6">

                  <h3 className="mb-2 text-sm font-semibold text-slate-200">
                    Sobre esta matéria
                  </h3>

                  <p className="text-sm leading-6 text-slate-400">
                    {subject.description}
                  </p>

                </div>
              )}

            </div>

          </div>

          <div className="space-y-6">

            <div className="rounded-xl border border-slate-800 bg-[#1E2834] p-6 shadow-sm">

              <h2 className="mb-4 text-lg font-semibold text-white">
                Praticar
              </h2>

              <div className="space-y-3">

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 cursor-pointer py-3 font-semibold text-slate-950 transition"
                >
                  <Play className="h-4 w-4" />
                  Iniciar Simulado
                </button>

                <Link
                  href={`/flashcards?subjectId=${subjectId}${certificationId ? `&certificationId=${certificationId}` : ""}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 py-3 font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
                >
                  <Layers className="h-4 w-4 text-amber-500" />
                  Revisar Flashcards
                </Link>

              </div>

            </div>

            <div className="rounded-xl border border-slate-800 bg-[#1E2834] p-6 shadow-sm">

              <h3 className="text-sm font-semibold text-white">
                Histórico de Estudos
              </h3>

              {sessions.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  Você ainda não possui sessões de estudo nesta matéria.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {sessions.slice(0, 5).map(
                    (session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-200">
                            {STUDY_TYPE_LABELS[
                              session.studyType
                            ] ??
                              session.studyType}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {new Date(
                              session.startedAt,
                            ).toLocaleDateString(
                              "pt-BR",
                            )}
                          </p>

                        </div>

                        <span className="text-sm font-medium text-amber-500">
                          {getSessionDurationMinutes(
                            session,
                          )}{" "}
                          min
                        </span>

                      </div>
                    ),
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}