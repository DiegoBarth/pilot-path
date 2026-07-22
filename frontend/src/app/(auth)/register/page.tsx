import { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { AuthPageShell } from "@/features/auth/components/AuthPageShell";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Criar Conta | PilotPath",
  description: "Crie sua conta no PilotPath e inicie sua jornada",
};

export default function RegisterPage() {
  return (
    <AuthPageShell
      title="Iniciar Jornada"
      description="Crie sua conta para acessar o ecossistema PilotPath"
      footer={{
        text: "Já possui uma conta?",
        linkLabel: "Entrar",
        linkHref: routes.login,
      }}
    >
      <RegisterForm />
    </AuthPageShell>
  );
}
