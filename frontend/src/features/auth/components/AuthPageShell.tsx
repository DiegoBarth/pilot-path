import Link from "next/link";
import type { ReactNode } from "react";

interface AuthPageShellProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: {
    text: string;
    linkLabel: string;
    linkHref: string;
  };
}

export function AuthPageShell({
  title,
  description,
  children,
  footer,
}: AuthPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">
            {title}
          </h1>
          <p className="text-sm text-slate-400">{description}</p>
        </div>

        {children}

        <p className="px-8 text-center text-sm text-slate-400">
          {footer.text}{" "}
          <Link
            href={footer.linkHref}
            className="font-medium text-amber-500 underline-offset-4 hover:text-amber-400 hover:underline"
          >
            {footer.linkLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
