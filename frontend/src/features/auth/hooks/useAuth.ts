"use client";

import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/auth.api";
import { useAuthContext } from "@/providers/auth-provider";

export function useAuth() {
  const auth = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      auth.login(data.user, data.access_token, data.refresh_token);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
  });

  return {
    login: loginMutation,
    register: registerMutation,
  };
}
