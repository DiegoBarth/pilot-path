"use client";

import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth-provider";
import { ApiAuthHandler } from "@/components/providers/ApiAuthHandler";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ApiAuthHandler />
        {children}
      </AuthProvider>
    </QueryProvider>
  );
}
