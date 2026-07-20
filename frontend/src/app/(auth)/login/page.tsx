import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Login | PilotPath",
  description: "Acesse sua conta no PilotPath",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-slate-400">
            Insira suas credenciais para acessar seu painel de voo
          </p>
        </div>

        <LoginForm />

        <p className="px-8 text-center text-sm text-slate-400">
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-medium text-amber-500 hover:text-amber-400 underline-offset-4 hover:underline"
          >
            Criar Conta
          </Link>
        </p>
      </div>
    </div>
  );
}