import type { Mood } from "@/domain/mood";

export const MOOD_OPTIONS: {
  value: Mood;
  label: string;
  emoji: string;
}[] = [
  { value: "EXCELLENT", label: "Excelente", emoji: "🚀" },
  { value: "GOOD", label: "Bom", emoji: "😊" },
  { value: "NEUTRAL", label: "Neutro", emoji: "😐" },
  { value: "TIRED", label: "Cansado", emoji: "😴" },
  { value: "FRUSTRATED", label: "Frustrado", emoji: "😤" },
];
