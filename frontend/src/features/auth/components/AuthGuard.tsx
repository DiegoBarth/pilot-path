"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageLoading } from "@/components/shared/PageLoading";
import { routes } from "@/lib/routes";
import { useAuthContext } from "@/providers/auth-provider";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(routes.login);
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <PageLoading message="Verificando sessão..." />;
  }

  if (!isAuthenticated) {
    return <PageLoading message="Redirecionando..." />;
  }

  return children;
}
