import { cn } from "@/lib/utils";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function SelectField({ label, className, id, ...props }: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
      </label>

      <select
        id={fieldId}
        className={cn(
          "w-full rounded-xl border border-slate-700 bg-surface-input px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}
