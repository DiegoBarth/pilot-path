import type { StudyActivityType } from "@/features/dashboard/types";

export const STUDY_ACTIVITY_LABELS: Record<StudyActivityType, string> = {
  READING: "Leitura",
  EXERCISES: "Exercícios",
  FLASHCARDS: "Flashcards",
  VIDEO: "Vídeo",
  SIMULATOR: "Simulador",
  MOCK_EXAM: "Simulado",
  OTHER: "Estudo",
};

export const STUDY_ACTIVITY_DOT_COLORS: Record<StudyActivityType, string> = {
  READING: "bg-sky-500",
  EXERCISES: "bg-amber-500",
  FLASHCARDS: "bg-emerald-500",
  VIDEO: "bg-violet-500",
  SIMULATOR: "bg-teal-500",
  MOCK_EXAM: "bg-orange-500",
  OTHER: "bg-slate-500",
};
