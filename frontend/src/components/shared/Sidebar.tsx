"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Plane,
  LayoutDashboard,
  Award,
  Layers,
  FileText,
  BarChart2,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { useAuthContext } from "@/providers/auth-provider";

const navigation = [
  { name: "Painel", href: routes.dashboard, icon: LayoutDashboard },
  { name: "Certificações", href: routes.certifications, icon: Award },
  { name: "Flashcards", href: routes.flashcards, icon: Layers },
  { name: "Simulados", href: routes.mockExams, icon: FileText },
  { name: "Estatísticas", href: routes.analytics, icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthContext();

  function handleLogout() {
    logout();
    router.replace(routes.login);
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/5 bg-card px-4 py-6">
      <div className="mb-6 flex items-center gap-2.5 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
          <Plane className="h-4 w-4 text-amber-400" />
        </div>
        <span className="text-base font-semibold tracking-tight text-white">
          PilotPath
        </span>
      </div>

      <div className="mb-8 flex items-center justify-between rounded-xl border border-white/5 bg-surface-elevated px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
            <User className="h-4 w-4 text-slate-300" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-white">
              {user?.name ?? "Usuário"}
            </span>
            <span className="truncate text-xs uppercase tracking-wide text-slate-500">
              {user?.role ?? "Piloto"}
            </span>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-active text-amber-400"
                  : "text-slate-400 hover:bg-surface-elevated hover:text-slate-200",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-amber-400" : "text-slate-500",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/30 hover:text-red-300"
      >
        <LogOut className="h-5 w-5" />
        Sair
      </button>
    </aside>
  );
}
