"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { getErrorMessage } from "@/lib/api/errors";
import { routes } from "@/lib/routes";
import { registerSchema, type RegisterFormData } from "../lib/schemas";
import { useAuth } from "../hooks/useAuth";
import { AuthFormAlert } from "./AuthFormAlert";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: RegisterFormData) {
    setApiError(null);

    registerUser.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          router.push(routes.login);
        },
        onError(error) {
          setApiError(
            getErrorMessage(error, "Não foi possível criar a conta."),
          );
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {apiError && <AuthFormAlert message={apiError} />}

      <FormField
        label="Nome Completo"
        id="name"
        type="text"
        placeholder="Seu nome"
        error={errors.name?.message}
        disabled={registerUser.isPending}
        {...register("name")}
      />

      <FormField
        label="E-mail"
        id="email"
        type="email"
        placeholder="piloto@exemplo.com"
        error={errors.email?.message}
        disabled={registerUser.isPending}
        {...register("email")}
      />

      <FormField
        label="Senha"
        id="password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        disabled={registerUser.isPending}
        {...register("password")}
      />

      <Button
        type="submit"
        variant="default"
        disabled={registerUser.isPending}
        className="mt-2 w-full font-semibold"
      >
        {registerUser.isPending ? "Criando Conta..." : "Criar Conta"}
      </Button>
    </form>
  );
}
