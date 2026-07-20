"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  LayoutDashboard,
  Award,
  Layers,
  FileText,
  BarChart2,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

import { useAuthContext } from "@/providers/auth-provider";

const navigation = [
  { name: "Painel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Certificações", href: "/certifications", icon: Award },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
  { name: "Simulados", href: "/mock-exams", icon: FileText },
  { name: "Estatísticas", href: "/analytics", icon: BarChart2 },
];

export function Sidebar() {

  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuthContext();


  function handleLogout() {

    logout();

    router.replace("/login");
  }


  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6">

      {/* User Profile */}
      <div className="mb-8 flex items-center justify-between rounded-lg px-3 py-2">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-800">
            <User className="h-5 w-5 text-slate-300" />
          </div>


          <div className="flex flex-col">

            <span className="text-sm font-medium text-slate-200">
              {user?.name ?? "Usuário"}
            </span>


            <span className="text-xs text-slate-500">
              {user?.role ?? "Piloto"}
            </span>

          </div>

        </div>


        <ChevronDown className="h-4 w-4 text-slate-500" />

      </div>


      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">

        {
          navigation.map((item) => {

            const isActive =
              pathname === item.href;

            const Icon = item.icon;


            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800/80 text-amber-500"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                )}
              >

                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-amber-500"
                      : "text-slate-500"
                  )}
                />

                {item.name}

              </Link>
            );

          })
        }

      </nav>


      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          mt-auto
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2.5
          text-sm
          font-medium
          text-red-400
          transition-colors
          hover:bg-red-950/30
          hover:text-red-300
        "
      >

        <LogOut className="h-5 w-5" />

        Sair

      </button>


    </div>
  );
}