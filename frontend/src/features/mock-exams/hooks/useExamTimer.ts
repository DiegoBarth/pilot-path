"use client";

import { useEffect, useState } from "react";
import { getElapsedSecondsSince } from "../lib/format-duration";

export function useExamTimer(startedAt: string, isActive: boolean) {
  const [elapsedSeconds, setElapsedSeconds] = useState(() =>
    getElapsedSecondsSince(startedAt),
  );

  useEffect(() => {
    setElapsedSeconds(getElapsedSecondsSince(startedAt));
  }, [startedAt]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = window.setInterval(() => {
      setElapsedSeconds(getElapsedSecondsSince(startedAt));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startedAt, isActive]);

  return elapsedSeconds;
}
