"use client";

import { useId } from "react";

/** Horizonte artificial (Attitude Indicator) — watermark do card de progresso. */
export function AttitudeIndicator() {
  const uid = useId().replace(/:/g, "");
  const clipId = `ai-clip-${uid}`;
  const glowId = `ai-glow-${uid}`;
  const skyId = `ai-sky-${uid}`;
  const groundId = `ai-ground-${uid}`;

  return (
    <svg
      viewBox="0 0 320 280"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="160" cy="150" r="118" />
        </clipPath>
        <radialGradient id={glowId} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.3" />
        </radialGradient>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </linearGradient>
        <linearGradient id={groundId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      {/* Bezel externo */}
      <circle
        cx="160"
        cy="150"
        r="124"
        fill="none"
        stroke="#334155"
        strokeWidth="3"
        opacity="0.7"
      />
      <circle
        cx="160"
        cy="150"
        r="118"
        fill={`url(#${glowId})`}
        opacity="0.85"
      />

      <g clipPath={`url(#${clipId})`} opacity="0.85">
        {/* Céu */}
        <rect x="0" y="0" width="320" height="150" fill={`url(#${skyId})`} />
        {/* Solo */}
        <rect x="0" y="150" width="320" height="150" fill={`url(#${groundId})`} />
        {/* Linha do horizonte */}
        <line
          x1="0"
          y1="150"
          x2="320"
          y2="150"
          stroke="#f8fafc"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Marcas de pitch */}
        {[
          { y: 110, w: 36 },
          { y: 90, w: 22 },
          { y: 70, w: 36 },
          { y: 190, w: 36 },
          { y: 210, w: 22 },
          { y: 230, w: 36 },
        ].map((mark) => (
          <line
            key={mark.y}
            x1={160 - mark.w / 2}
            y1={mark.y}
            x2={160 + mark.w / 2}
            y2={mark.y}
            stroke="#e2e8f0"
            strokeWidth="1.5"
            opacity="0.55"
          />
        ))}
      </g>

      {/* Escala curva superior (100–400) */}
      <g fill="#94a3b8" fontSize="11" fontFamily="sans-serif" opacity="0.75">
        {[
          { label: "100", angle: -55 },
          { label: "200", angle: -25 },
          { label: "300", angle: 5 },
          { label: "400", angle: 35 },
        ].map(({ label, angle }) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const r = 108;
          const x = 160 + r * Math.cos(rad);
          const y = 150 + r * Math.sin(rad);
          return (
            <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle">
              {label}
            </text>
          );
        })}
      </g>

      {/* Ticks da escala superior */}
      {Array.from({ length: 17 }, (_, i) => {
        const angle = -70 + i * 8.75;
        const rad = ((angle - 90) * Math.PI) / 180;
        const major = i % 4 === 0;
        const r1 = major ? 95 : 100;
        const r2 = 112;
        return (
          <line
            key={i}
            x1={160 + r1 * Math.cos(rad)}
            y1={150 + r1 * Math.sin(rad)}
            x2={160 + r2 * Math.cos(rad)}
            y2={150 + r2 * Math.sin(rad)}
            stroke={major ? "#f59e0b" : "#64748b"}
            strokeWidth={major ? 1.5 : 1}
            opacity={major ? 0.7 : 0.45}
          />
        );
      })}

      {/* Avião simbólico (asa fixa) */}
      <g stroke="#f59e0b" strokeWidth="2.5" fill="none" opacity="0.9">
        <line x1="100" y1="150" x2="140" y2="150" strokeLinecap="round" />
        <line x1="180" y1="150" x2="220" y2="150" strokeLinecap="round" />
        <circle cx="160" cy="150" r="4" fill="#f59e0b" stroke="none" />
        <line x1="160" y1="150" x2="160" y2="168" strokeLinecap="round" />
      </g>

      {/* Arco âmbar de destaque */}
      <path
        d="M 70 80 A 118 118 0 0 1 210 40"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
