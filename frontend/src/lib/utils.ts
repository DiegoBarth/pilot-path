import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(date: string | Date) {
  const target = typeof date === "string" ? new Date(date) : date;
  const diffInSeconds = Math.round((target.getTime() - Date.now()) / 1000);

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  const formatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diffInSeconds) >= secondsInUnit) {
      return formatter.format(Math.round(diffInSeconds / secondsInUnit), unit);
    }
  }

  return formatter.format(diffInSeconds, "second");
}

export function formatAccuracy(value: number, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}

export function formatCountLabel(
  count: number,
  singular: string,
  plural: string,
) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function formatDate(date: string | Date) {
  const target = typeof date === "string" ? new Date(date) : date;
  return target.toLocaleDateString("pt-BR");
}
