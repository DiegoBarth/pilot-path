"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { getErrorMessage } from "@/lib/api/errors";
import { routes } from "@/lib/routes";
import { useAuth } from "../hooks/useAuth";
import { getDevLoginDefaults } from "../lib/dev-credentials";
import { loginSchema, type LoginFormData } from "../lib/schemas";
import { AuthFormAlert } from "./AuthFormAlert";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const devDefaults = getDevLoginDefaults();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: devDefaults.email,
      password: devDefaults.password,
    },
  });

  function onSubmit(data: LoginFormData) {
    setApiError(null);

    login.mutate(data, {
      onSuccess() {
        router.push(routes.dashboard);
      },
      onError(error) {
        setApiError(getErrorMessage(error, "Não foi possível entrar."));
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {apiError && <AuthFormAlert message={apiError} />}

      <FormField
        label="E-mail"
        id="email"
        type="email"
        placeholder="piloto@exemplo.com"
        error={errors.email?.message}
        disabled={login.isPending}
        {...register("email")}
      />

      <FormField
        label="Senha"
        id="password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        disabled={login.isPending}
        {...register("password")}
      />

      <Button
        type="submit"
        variant="default"
        disabled={login.isPending}
        className="w-full font-semibold"
      >
        {login.isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
