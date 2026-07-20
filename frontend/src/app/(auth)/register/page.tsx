import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Criar Conta | PilotPath",
  description: "Crie sua conta no PilotPath e inicie sua jornada",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">
            Iniciar Jornada
          </h1>
          <p className="text-sm text-slate-400">
            Crie sua conta para acessar o ecossistema PilotPath
          </p>
        </div>

        <RegisterForm />

        <p className="px-8 text-center text-sm text-slate-400">
          Já possui uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-amber-500 hover:text-amber-400 underline-offset-4 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}