"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setUnauthorizedHandler } from "@/lib/api/auth-session";
import { routes } from "@/lib/routes";
import { useAuthContext } from "@/providers/auth-provider";

export function ApiAuthHandler() {
  const router = useRouter();
  const { logout } = useAuthContext();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      router.replace(routes.login);
    });
  }, [logout, router]);

  return null;
}
