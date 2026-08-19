import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Marque Hazav'Iary : un soleil dont les rayons inférieurs se referment en
 * feuille — la rencontre du solaire et du vivant.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hz-sun" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFCE4D" />
          <stop offset="100%" stopColor="#F5A200" />
        </linearGradient>
        <linearGradient id="hz-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#027A48" />
          <stop offset="100%" stopColor="#32D583" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="17" r="7.5" fill="url(#hz-sun)" />
      <g stroke="url(#hz-sun)" strokeWidth="2.4" strokeLinecap="round">
        <path d="M20 3.2v3.4" />
        <path d="M31.4 8.2 29 10.6" />
        <path d="M36.2 19h-3.4" />
        <path d="M8.6 8.2 11 10.6" />
        <path d="M3.8 19h3.4" />
      </g>
      <path
        d="M6 36c-1.2-7.4 4.6-13.6 13.4-13.6 5 0 8.6 1.6 11.6 4-1.4 7-7.4 11.4-14.6 11.4-4.2 0-7.8-.6-10.4-1.8Z"
        fill="url(#hz-leaf)"
      />
      <path
        d="M9.6 33.4c4.4-3.4 9.4-5.6 15.4-6.6"
        stroke="#ECFDF3"
        strokeOpacity=".65"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}
      aria-label={`${site.name} — accueil`}
    >
      <LogoMark />
      <span>
        Hazav<span className="text-solar-500">&rsquo;</span>Iary
      </span>
    </Link>
  );
}
