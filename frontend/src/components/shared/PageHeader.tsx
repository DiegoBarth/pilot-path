interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-3xl text-slate-400">{description}</p>
      )}
    </div>
  );
}
