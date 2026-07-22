import { RegisterForm } from "./RegisterForm";
import { AuthPageShell } from "./AuthPageShell";
import { routes } from "@/lib/routes";

export function RegisterPage() {
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
