interface CertificationHeaderProps {
  certification: {
    name: string;
    description?: string;
  };

  progress: number;
}

export function CertificationHeader({ certification, progress }: CertificationHeaderProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-50">
          {certification.name}
        </h1>
        {certification.description && (
          <p className="max-w-3xl text-slate-400">
            {certification.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-8">
        <div>
          <p className="text-xs uppercase text-slate-500">
            Progress
          </p>
          <p className="text-2xl font-bold text-amber-400">
            {progress}%
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-500">
            Status
          </p>
          <p className="text-sm font-medium text-emerald-400">
            In Progress
          </p>
        </div>
      </div>
    </div>
  );
}