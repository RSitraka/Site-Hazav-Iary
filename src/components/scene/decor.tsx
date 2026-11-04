/**
 * ---------------------------------------------------------------------------
 * DÉCOR — illustrations de la maison
 * ---------------------------------------------------------------------------
 * Dessins vectoriels volontairement simples (aplats, deux ou trois ombres) :
 * le décor encadre le contenu, il ne doit jamais lui voler la vedette.
 * Toutes les couleurs passent par les variables `--sc-*` de `globals.css`,
 * qui changent entre le jour (mode clair) et la nuit (mode sombre).
 *
 * Tout est décoratif : `aria-hidden`, aucun texte dans les dessins.
 */
import type { Furniture } from "@/lib/scene";

const v = (name: string) => `var(--sc-${name})`;

/** Fenêtre de pièce : ciel du moment, soleil le jour, lune et étoiles la nuit. */
export function RoomWindow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 190" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="win-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: v("sky-1") }} />
          <stop offset="1" style={{ stopColor: v("sky-2") }} />
        </linearGradient>
      </defs>
      {/* Embrasure */}
      <rect x="6" y="6" width="148" height="162" rx="6" fill={v("wood")} />
      <rect x="16" y="16" width="128" height="142" rx="3" fill="url(#win-sky)" />
      {/* Soleil (jour) / lune et étoiles (nuit) */}
      <g className="dark:hidden">
        <circle cx="108" cy="50" r="15" fill="#FFD36B" />
        <ellipse cx="52" cy="104" rx="26" ry="9" fill="#fff" opacity=".85" />
      </g>
      <g className="hidden dark:inline">
        <circle cx="106" cy="48" r="13" fill="#F4EBD0" />
        <circle cx="112" cy="44" r="12" fill={v("sky-1")} />
        <circle cx="40" cy="40" r="1.6" fill="#fff" />
        <circle cx="62" cy="70" r="1.2" fill="#fff" />
        <circle cx="128" cy="96" r="1.4" fill="#fff" />
        <circle cx="34" cy="118" r="1.1" fill="#fff" />
      </g>
      {/* Collines au loin */}
      <path d="M16 136 Q50 112 84 130 T144 124 V158 H16Z" fill={v("hill")} />
      {/* Croisillons */}
      <rect x="77" y="16" width="6" height="142" fill={v("wood")} />
      <rect x="16" y="84" width="128" height="6" fill={v("wood")} />
      {/* Appui */}
      <rect x="0" y="164" width="160" height="12" rx="3" fill={v("wood-dark")} />
      {/* Rideaux */}
      <path d="M10 4 H40 Q30 90 44 180 H10Z" fill={v("curtain")} opacity=".92" />
      <path d="M150 4 H120 Q130 90 116 180 H150Z" fill={v("curtain")} opacity=".92" />
      <rect x="2" y="0" width="156" height="6" rx="3" fill={v("wood-dark")} />
    </svg>
  );
}

/** Plante en pot, posée dans un coin. */
export function Plant({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 140" className={className} aria-hidden="true" focusable="false">
      <path d="M45 92 C20 70 8 46 14 22 C30 40 40 62 45 92Z" fill={v("leaf-2")} />
      <path d="M45 92 C70 72 84 48 78 18 C60 38 50 62 45 92Z" fill={v("leaf")} />
      <path d="M45 94 C38 62 40 30 48 6 C56 34 54 64 45 94Z" fill={v("leaf")} />
      <path d="M22 92 H68 L62 136 H28Z" fill={v("pot")} />
      <rect x="18" y="88" width="54" height="10" rx="3" fill={v("pot-dark")} />
    </svg>
  );
}

/** Lampe suspendue au plafond (couloir) — son halo est géré en CSS. */
export function PendantLamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden="true" focusable="false">
      <rect x="29" y="0" width="2" height="50" fill={v("wood-dark")} />
      <path d="M12 72 Q30 40 48 72Z" fill={v("lamp")} />
      <ellipse cx="30" cy="73" rx="13" ry="4" fill="#FFE7A8" />
    </svg>
  );
}

/** Mobilier de pièce, un par pièce (voir `src/lib/scene.ts`). */
export function FurniturePiece({ kind, className = "" }: { kind: Furniture; className?: string }) {
  const common = { className, "aria-hidden": true as const, focusable: "false" as const };
  switch (kind) {
    case "desk":
      return (
        <svg viewBox="0 0 220 120" {...common}>
          {/* Lampe de bureau */}
          <path d="M150 52 L162 20 L182 26" stroke={v("wood-dark")} strokeWidth="4" fill="none" />
          <path d="M172 18 L196 26 L186 40Z" fill={v("lamp")} />
          <rect x="140" y="50" width="22" height="5" rx="2" fill={v("wood-dark")} />
          {/* Pile de dossiers */}
          <rect x="40" y="42" width="56" height="7" rx="1.5" fill="#E8E2D5" />
          <rect x="44" y="35" width="52" height="7" rx="1.5" fill={v("accent-paper")} />
          {/* Plateau et pieds */}
          <rect x="10" y="55" width="200" height="12" rx="3" fill={v("wood")} />
          <rect x="22" y="67" width="10" height="53" fill={v("wood-dark")} />
          <rect x="188" y="67" width="10" height="53" fill={v("wood-dark")} />
          <rect x="120" y="67" width="62" height="34" rx="3" fill={v("wood-dark")} />
          <rect x="146" y="80" width="12" height="3" rx="1.5" fill={v("wood")} />
        </svg>
      );
    case "shelf":
      return (
        <svg viewBox="0 0 160 160" {...common}>
          <rect x="10" y="0" width="140" height="160" rx="4" fill={v("wood-dark")} />
          {[18, 66, 114].map((y) => (
            <g key={y}>
              <rect x="18" y={y} width="10" height="36" fill={v("accent-paper")} />
              <rect x="30" y={y + 4} width="8" height="32" fill="#E8E2D5" />
              <rect x="40" y={y} width="12" height="36" fill={v("leaf-2")} />
              <rect x="54" y={y + 6} width="9" height="30" fill={v("curtain")} />
              <rect x="18" y={y + 36} width="124" height="6" fill={v("wood")} />
            </g>
          ))}
        </svg>
      );
    case "armchair":
      return (
        <svg viewBox="0 0 180 130" {...common}>
          <rect x="34" y="10" width="112" height="70" rx="22" fill={v("curtain")} />
          <rect x="14" y="56" width="152" height="40" rx="16" fill={v("curtain")} />
          <rect x="44" y="62" width="92" height="22" rx="9" fill={v("cushion")} />
          <rect x="6" y="48" width="30" height="58" rx="13" fill={v("cushion")} />
          <rect x="144" y="48" width="30" height="58" rx="13" fill={v("cushion")} />
          <rect x="26" y="104" width="8" height="24" rx="2" fill={v("wood-dark")} />
          <rect x="146" y="104" width="8" height="24" rx="2" fill={v("wood-dark")} />
        </svg>
      );
    case "workbench":
      return (
        <svg viewBox="0 0 230 130" {...common}>
          {/* Panneau solaire posé sur l'établi */}
          <g transform="translate(32 6) skewX(-14)">
            <rect width="92" height="52" rx="3" fill="#123445" />
            {[0, 1, 2].map((c) =>
              [0, 1].map((r) => (
                <rect
                  key={`${c}-${r}`}
                  x={4 + c * 29}
                  y={4 + r * 23}
                  width="26"
                  height="20"
                  rx="1.5"
                  fill="rgb(var(--accent-pure))"
                  opacity=".75"
                />
              )),
            )}
          </g>
          {/* Batterie */}
          <rect x="146" y="26" width="46" height="34" rx="4" fill={v("slate")} />
          <rect x="156" y="20" width="8" height="6" fill={v("slate")} />
          <rect x="174" y="20" width="8" height="6" fill={v("slate")} />
          <rect x="154" y="38" width="30" height="5" rx="2.5" fill="rgb(var(--green))" />
          <rect x="6" y="60" width="218" height="12" rx="3" fill={v("wood")} />
          <rect x="16" y="72" width="10" height="58" fill={v("wood-dark")} />
          <rect x="204" y="72" width="10" height="58" fill={v("wood-dark")} />
          <rect x="16" y="108" width="198" height="6" fill={v("wood-dark")} />
        </svg>
      );
    case "sideboard":
      return (
        <svg viewBox="0 0 220 120" {...common}>
          {/* Petite lanterne solaire posée dessus */}
          <rect x="150" y="16" width="26" height="34" rx="5" fill={v("slate")} />
          <rect x="155" y="22" width="16" height="22" rx="3" fill="#FFE7A8" />
          <rect x="150" y="10" width="26" height="6" rx="2" fill="#123445" />
          <rect x="40" y="30" width="40" height="20" rx="2" fill={v("wood-dark")} />
          <rect x="44" y="34" width="32" height="12" fill={v("accent-paper")} />
          <rect x="8" y="50" width="204" height="56" rx="5" fill={v("wood")} />
          <rect x="18" y="58" width="88" height="40" rx="3" fill={v("wood-dark")} />
          <rect x="114" y="58" width="88" height="40" rx="3" fill={v("wood-dark")} />
          <rect x="18" y="106" width="8" height="14" fill={v("wood-dark")} />
          <rect x="194" y="106" width="8" height="14" fill={v("wood-dark")} />
        </svg>
      );
    case "lamp":
    default:
      return (
        <svg viewBox="0 0 80 170" {...common}>
          <path d="M14 48 L28 6 H52 L66 48Z" fill={v("lamp")} />
          <rect x="38" y="48" width="4" height="108" fill={v("wood-dark")} />
          <ellipse cx="40" cy="162" rx="22" ry="6" fill={v("wood-dark")} />
        </svg>
      );
  }
}
