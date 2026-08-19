/**
 * Illustration du hero : soleil et champ de panneaux, dans les couleurs de la
 * charte Hazav'Iary (turquoise pétrole, orange solaire, vert). Vectorielle et
 * intégrée au HTML — aucune requête réseau, aucun décalage de mise en page.
 *
 * Les aplats utilisent les variables du thème : l'illustration suit donc
 * automatiquement le mode clair ou sombre.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 400"
      className={className}
      role="img"
      aria-label="Illustration d'une installation de panneaux solaires sous un soleil rayonnant"
    >
      {/* Cadre plat, à l'image de l'interface de l'application */}
      <rect
        x="1"
        y="1"
        width="518"
        height="398"
        rx="4"
        fill="rgb(var(--panel-2))"
        stroke="rgb(var(--border))"
        strokeWidth="1.5"
      />

      {/* Rose des vents en filigrane, reprise de l'emblème */}
      <g stroke="rgb(var(--accent))" strokeOpacity="0.16" strokeWidth="1.5" fill="none">
        <circle cx="352" cy="126" r="86" />
        <circle cx="352" cy="126" r="70" />
        <path d="M352 24v20M352 208v20M250 126h20M434 126h20" />
      </g>

      {/* Rayons solaires */}
      <g fill="rgb(var(--orange))">
        {[
          [352, 40],
          [406, 62],
          [428, 116],
          [406, 170],
          [352, 192],
          [298, 170],
          [276, 116],
          [298, 62],
        ].map(([x, y], i) => (
          <polygon
            key={i}
            points="-4,-16 4,-16 0,0"
            transform={`translate(${x} ${y}) rotate(${i * 45 + 180})`}
          />
        ))}
      </g>

      {/* Disque solaire */}
      <circle cx="352" cy="116" r="40" fill="rgb(var(--orange))" />
      <circle cx="352" cy="116" r="40" fill="rgb(var(--surface))" fillOpacity="0.12" />

      {/* Sol */}
      <path d="M0 318h520v81a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4Z" fill="rgb(var(--green))" fillOpacity="0.1" />
      <path d="M0 318h520" stroke="rgb(var(--green))" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* Rangée arrière */}
      <g opacity="0.5">
        <path
          d="M74 268h116l-12-46H84Z"
          fill="rgb(var(--accent))"
          fillOpacity="0.16"
          stroke="rgb(var(--accent))"
          strokeWidth="1.5"
        />
        <path
          d="M92 245h86M115 222l-8 46M147 222v46M179 222l8 46"
          stroke="rgb(var(--accent))"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
        <path d="M132 268v22M116 290h32" stroke="rgb(var(--slate))" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Rangée principale */}
      <g>
        <path
          d="M204 318h192l-21-78H225Z"
          fill="rgb(var(--accent))"
          fillOpacity="0.2"
          stroke="rgb(var(--accent))"
          strokeWidth="2"
        />
        <path
          d="M214 279h172M262 240l-21 78M300 240v78M338 240l21 78"
          stroke="rgb(var(--accent))"
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
        <path
          d="M300 318v34M272 352h56"
          stroke="rgb(var(--slate))"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      {/* Production : éclair orange */}
      <path
        d="M446 232l-22 30h14l-5 24 23-32h-15Z"
        fill="rgb(var(--orange))"
        stroke="rgb(var(--orange-deep))"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Feuille : énergie propre */}
      <path
        d="M66 352c-12-4-19-14-17-26 14-2 26 5 29 17 7-10 19-15 30-10-2 14-14 23-28 22-4 0-9-1-14-3Z"
        fill="rgb(var(--green))"
        fillOpacity="0.85"
      />
    </svg>
  );
}
