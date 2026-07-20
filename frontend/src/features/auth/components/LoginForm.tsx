"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const {
    login,
  } = useAuth();


  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@pilotpath.com",
      password: "Password123!",
    },
  });


  function onSubmit(data: LoginFormData) {
    login.mutate(data, {
      onSuccess(data) {
        router.push("/dashboard");
      },
      onError(error) {
        console.error(error);
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

      <div className="space-y-2">

        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-200"
        >
          E-mail
        </label>

        <input
          id="email"
          type="email"
          placeholder="piloto@exemplo.com"
          {...register("email")}
          disabled={login.isPending}
          className="w-full rounded-md border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />

        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}

      </div>


      <div className="space-y-2">

        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-200"
        >
          Senha
        </label>

        <input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          disabled={login.isPending}
          className="w-full rounded-md border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />

        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

      </div>


      <Button
        type="submit"
        disabled={login.isPending}
        className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold"
      >
        {
          login.isPending
            ? "Entrando..."
            : "Entrar"
        }
      </Button>


    </form>
  );
}