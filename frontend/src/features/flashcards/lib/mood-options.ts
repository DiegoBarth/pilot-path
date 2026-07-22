import { Mood } from "@/features/study/types";

export const MOOD_OPTIONS: {
  value: Mood;
  label: string;
  emoji: string;
}[] = [
  { value: Mood.EXCELLENT, label: "Excelente", emoji: "🚀" },
  { value: Mood.GOOD, label: "Bom", emoji: "😊" },
  { value: Mood.NEUTRAL, label: "Neutro", emoji: "😐" },
  { value: Mood.TIRED, label: "Cansado", emoji: "😴" },
  { value: Mood.FRUSTRATED, label: "Frustrado", emoji: "😤" },
];
