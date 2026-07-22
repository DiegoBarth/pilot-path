import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthPageShell } from "@/features/auth/components/AuthPageShell";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Login | PilotPath",
  description: "Acesse sua conta no PilotPath",
};

export default function LoginPage() {
  return (
    <AuthPageShell
      title="Bem-vindo de volta"
      description="Insira suas credenciais para acessar seu painel de voo"
      footer={{
        text: "Ainda não tem uma conta?",
        linkLabel: "Criar Conta",
        linkHref: routes.register,
      }}
    >
      <LoginForm />
    </AuthPageShell>
  );
}
