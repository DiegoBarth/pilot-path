import Link from "next/link";


interface CertificationCardProps {
  certification: {
    id: string;
    name: string;
    description: string;
    progress?: number;
    status: string;
  };
}


export function CertificationCard({
  certification,
}: CertificationCardProps) {

  return (
    <Link
      href={`/certifications/${certification.id}`}
      className="
        rounded-2xl
        border
        border-white/5
        bg-[#1E2834]
        p-6
        transition
        hover:border-amber-500/40
      "
    >

      <h2 className="text-xl font-semibold text-slate-50">
        {certification.name}
      </h2>


      <p className="mt-2 text-sm text-slate-400">
        {certification.description}
      </p>


      {typeof certification.progress === "number" && (
        <div className="mt-6">

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              Progresso
            </span>

            <span className="text-amber-400">
              {certification.progress}%
            </span>
          </div>


          <div className="mt-2 h-2 rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-[#EDAA3F]"
              style={{
                width: `${certification.progress}%`,
              }}
            />

          </div>

        </div>
      )}


      <div className="mt-5">

        <span className="
          rounded-full
          bg-teal-500/10
          px-3
          py-1
          text-xs
          text-teal-400
        ">
          {certification.status}
        </span>

      </div>

    </Link>
  );
}