import { Metadata } from "next";

import { CertificationHeader } from "@/features/certifications/components/CertificationHeader";
import { ProgressCircle } from "@/features/certifications/components/ProgressCircle";
import { QuickAccessMini } from "@/features/certifications/components/QuickAccessMini";
import { CurriculumGrid } from "@/features/certifications/components/CurriculumGrid";


export const metadata: Metadata = {
  title: "Certification | PilotPath",
};


export default function CertificationDetailsPage() {

  const certification = {
    name: "Private Pilot License (PPL)",
    description:
      "Programa de formação para obtenção da licença de piloto privado.",
  };


  const progress = 42;


  return (

    <div className="min-h-screen bg-slate-950 p-8">

      <div className="mx-auto max-w-7xl space-y-8">


        <CertificationHeader
          certification={certification}
          progress={progress}
        />


        <div className="
          grid
          gap-6
          lg:grid-cols-3
        ">


          <div className="lg:col-span-2">

            <h2 className="mb-4 text-lg font-semibold text-slate-200">
              Certification Progress Overview
            </h2>


            <ProgressCircle
              percent={progress}
            />

          </div>



          <QuickAccessMini />


        </div>



        <section>

          <h2 className="mb-2 text-lg font-semibold text-slate-200">
            Certification Curriculum
          </h2>


          <p className="mb-5 text-sm text-slate-400">
            Continue seus estudos acompanhando o progresso das matérias.
          </p>


          <CurriculumGrid />


        </section>


      </div>

    </div>

  );
}