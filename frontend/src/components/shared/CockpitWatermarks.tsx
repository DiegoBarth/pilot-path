import { cn } from "@/lib/utils";

interface WatermarkProps {
  className?: string;
}

/** Altímetro estilo line-art — watermark discreto como nos mockups de prova. */
export function AltimeterWatermark({ className }: WatermarkProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-slate-300", className)}
      aria-hidden
    >
      <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
      <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />

      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 60 + Math.sin(rad) * 48;
        const y1 = 60 - Math.cos(rad) * 48;
        const x2 = 60 + Math.sin(rad) * (deg % 90 === 0 ? 40 : 44);
        const y2 = 60 - Math.cos(rad) * (deg % 90 === 0 ? 40 : 44);

        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={deg % 90 === 0 ? 1 : 0.6}
            opacity={deg % 90 === 0 ? 0.7 : 0.4}
          />
        );
      })}

      <text x="60" y="18" textAnchor="middle" fill="currentColor" fontSize="7" opacity="0.6">
        10
      </text>
      <text x="98" y="64" textAnchor="middle" fill="currentColor" fontSize="7" opacity="0.6">
        3
      </text>
      <text x="60" y="106" textAnchor="middle" fill="currentColor" fontSize="7" opacity="0.6">
        5
      </text>
      <text x="22" y="64" textAnchor="middle" fill="currentColor" fontSize="7" opacity="0.6">
        9
      </text>

      <line
        x1="60"
        y1="60"
        x2="60"
        y2="28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="60"
        y1="60"
        x2="82"
        y2="72"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.8" />

      <rect x="48" y="78" width="24" height="10" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <text x="60" y="85.5" textAnchor="middle" fill="currentColor" fontSize="5.5" opacity="0.5">
        ALT
      </text>
    </svg>
  );
}

/** Cronômetro / timer — par com o altímetro nos mockups. */
export function ChronographWatermark({ className }: WatermarkProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-slate-300", className)}
      aria-hidden
    >
      <rect x="22" y="8" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="66" y="8" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M34 14 H66"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      <circle cx="50" cy="68" r="42" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
      <circle cx="50" cy="68" r="32" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />

      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 50 + Math.sin(rad) * 38;
        const y1 = 68 - Math.cos(rad) * 38;
        const x2 = 50 + Math.sin(rad) * 32;
        const y2 = 68 - Math.cos(rad) * 32;

        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={deg % 90 === 0 ? 0.9 : 0.5}
            opacity={deg % 90 === 0 ? 0.65 : 0.35}
          />
        );
      })}

      <line
        x1="50"
        y1="68"
        x2="50"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="50"
        y1="68"
        x2="68"
        y2="76"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="50" cy="68" r="2.5" fill="currentColor" opacity="0.75" />

      <circle cx="50" cy="32" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <line x1="50" y1="26" x2="50" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

/** Horizonte artificial — variante line-art para composição lateral. */
export function AttitudeWatermark({ className }: WatermarkProps) {
  return (
    <svg
      viewBox="0 0 140 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-slate-300", className)}
      aria-hidden
    >
      <rect x="4" y="4" width="132" height="92" rx="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      <path d="M4 50 H136" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <path d="M4 38 H136" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
      <path d="M4 62 H136" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />

      <path
        d="M4 50 L70 28 L136 50"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
      />

      <circle cx="70" cy="50" r="14" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="56" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <line x1="70" y1="36" x2="70" y2="64" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />

      <path d="M20 72 L40 72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M100 72 L120 72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="70" cy="50" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
