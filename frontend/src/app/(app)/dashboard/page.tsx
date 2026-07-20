import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Play,
  Zap,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Painel | PilotPath",
  description: "Visão geral do seu progresso de estudos no PilotPath",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 p-6 md:p-8">
      {/* Header & Quick Actions */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">
            Painel
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Acompanhe seu progresso e retome seus estudos.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <Button className="bg-slate-800 text-slate-50 hover:bg-slate-700">
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            Quiz Rápido
          </Button>
          <Button className="bg-amber-500 font-semibold text-slate-950 hover:bg-amber-400">
            <Play className="mr-2 h-4 w-4" />
            Continuar Última Sessão
          </Button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Precisão (Flashcards)</p>
            <Target className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-slate-50">84%</p>
            <p className="mt-1 text-xs text-emerald-400 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" /> +2.5% nesta semana
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Tempo de Estudo</p>
            <Clock className="h-5 w-5 text-slate-500" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-slate-50">12h 45m</p>
            <p className="mt-1 text-xs text-slate-500">Neste mês</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Simulados Feitos</p>
            <BookOpen className="h-5 w-5 text-slate-500" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-slate-50">7</p>
            <p className="mt-1 text-xs text-slate-500">4 aprovados</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Meta Semanal</p>
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-slate-50">5/7</p>
            <p className="mt-1 text-xs text-slate-500">Dias de estudo ativo</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Certifications Progress */}
        <div className="col-span-1 flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 lg:col-span-4">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-50">Minhas Certificações</h2>
          </div>
          <div className="flex flex-1 flex-col justify-center p-6 space-y-6">
            
            {/* Mock Certification Item */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">Piloto Privado - Avião (PPA)</span>
                <span className="text-slate-400">65%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full bg-amber-500" style={{ width: "65%" }} />
              </div>
            </div>

            {/* Mock Certification Item */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">Piloto Comercial (PCA)</span>
                <span className="text-slate-400">12%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full bg-amber-500" style={{ width: "12%" }} />
              </div>
            </div>

          </div>
        </div>

        {/* Activity Timeline / Recent */}
        <div className="col-span-1 flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 lg:col-span-3">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-50">Atividade Recente</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              
              {/* Activity Item */}
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800">
                  <Target className="h-4 w-4 text-amber-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-slate-200">Revisão de Flashcards</p>
                  <p className="text-xs text-slate-500">Regulamentos de Tráfego Aéreo • Há 2 horas</p>
                </div>
              </div>

              {/* Activity Item */}
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800">
                  <BookOpen className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-slate-200">Simulado Finalizado</p>
                  <p className="text-xs text-slate-500">Meteorologia (Aprovado: 85%) • Ontem</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}