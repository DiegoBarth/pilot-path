export function getDaysUntilExam(targetExamDate: string) {
  const target = new Date(targetExamDate);
  target.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatExamCountdown(days: number) {
  if (days < 0) {
    return "Prova já realizada";
  }

  if (days === 0) {
    return "Prova hoje";
  }

  if (days === 1) {
    return "Prova: 1 dia restante";
  }

  return `Prova: ${days} dias restantes`;
}

export function getSessionDurationMinutes(session: {
  startedAt: string;
  endedAt?: string;
}) {
  if (!session.endedAt) {
    return 0;
  }

  const startedAt = new Date(session.startedAt).getTime();
  const endedAt = new Date(session.endedAt).getTime();

  if (Number.isNaN(startedAt) || Number.isNaN(endedAt)) {
    return 0;
  }

  return Math.max(0, Math.round((endedAt - startedAt) / 1000 / 60));
}

export function formatStudyTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}min`;
}
