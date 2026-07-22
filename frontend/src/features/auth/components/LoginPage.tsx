import { LoginForm } from "./LoginForm";
import { AuthPageShell } from "./AuthPageShell";
import { routes } from "@/lib/routes";

export function LoginPage() {
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
