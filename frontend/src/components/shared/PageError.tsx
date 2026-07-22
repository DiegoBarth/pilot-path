interface PageErrorProps {
  message?: string;
}

export function PageError({
  message = "Não foi possível carregar o conteúdo.",
}: PageErrorProps) {
  return <div className="p-8 text-slate-400">{message}</div>;
}
