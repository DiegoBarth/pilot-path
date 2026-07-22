import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormField({
  label,
  error,
  className,
  id,
  ...props
}: FormFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-slate-200">
        {label}
      </label>

      <input
        id={fieldId}
        className={cn(
          "w-full rounded-md border border-slate-800 bg-surface-input px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
