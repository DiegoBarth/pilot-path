interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Carregando..." }: PageLoadingProps) {
  return <div className="p-8 text-slate-400">{message}</div>;
}
