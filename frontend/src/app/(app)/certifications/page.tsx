import { Metadata } from "next";
import { CertificationCard } from "@/features/certifications/components/CertificationCard";

export const metadata: Metadata = {
  title: "Certificações | PilotPath",
  description: "Suas certificações em andamento",
};


const certifications = [
  {
    id: "ppl",
    name: "Private Pilot License (PPL)",
    description:
      "Formação inicial para obtenção da licença de piloto privado.",
    progress: 42,
    status: "In Progress",
  },
  {
    id: "ifr",
    name: "Instrument Rating (IFR)",
    description:
      "Treinamento para operações utilizando regras de voo por instrumentos.",
    progress: 12,
    status: "In Progress",
  },
  {
    id: "cpl",
    name: "Commercial Pilot License (CPL)",
    description:
      "Preparação para a licença de piloto comercial.",
    progress: 0,
    status: "Not Started",
  },
];


export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50">
            My Certifications
          </h1>

          <p className="mt-2 text-slate-400">
            Acompanhe seu progresso e continue sua jornada de formação.
          </p>
        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {certifications.map(certification => (
            <CertificationCard
              key={certification.id}
              certification={certification}
            />
          ))}

        </div>

      </div>

    </div>
  );
}