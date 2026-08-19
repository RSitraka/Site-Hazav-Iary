/**
 * Illustration du hero : soleil rayonnant au-dessus d'un champ de panneaux.
 * Vectorielle et intégrée au HTML — aucune requête réseau, aucun décalage de
 * mise en page, et un rendu net sur tous les écrans.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 440"
      className={className}
      role="img"
      aria-label="Illustration d'une installation de panneaux solaires sous un soleil rayonnant"
    >
      <defs>
        <radialGradient id="ha-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFCE4D" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F5A200" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F5A200" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ha-sun" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE08A" />
          <stop offset="100%" stopColor="#F5A200" />
        </linearGradient>
        <linearGradient id="ha-panel" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#0F2E24" />
          <stop offset="100%" stopColor="#05261D" />
        </linearGradient>
        <linearGradient id="ha-panel-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFCE4D" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#FFCE4D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ha-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12B76A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#12B76A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Halo solaire */}
      <circle cx="330" cy="130" r="190" fill="url(#ha-glow)" />

      {/* Rayons */}
      <g stroke="#F5A200" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round">
        <path d="M330 22v26" />
        <path d="M424 60 406 78" />
        <path d="M236 60l18 18" />
        <path d="M462 130h-26" />
        <path d="M198 130h26" />
      </g>

      {/* Disque solaire */}
      <circle cx="330" cy="130" r="58" fill="url(#ha-sun)" />
      <circle cx="330" cy="130" r="58" fill="none" stroke="#FFF3D0" strokeOpacity="0.5" strokeWidth="1.5" />

      {/* Sol */}
      <path d="M0 356c120-26 200-26 300-8s180 20 220 4v84H0Z" fill="url(#ha-ground)" />

      {/* Rangée arrière de panneaux */}
      <g opacity="0.55">
        <path d="M78 300h132l-14-52H92Z" fill="url(#ha-panel)" />
        <path d="M78 300h132l-14-52H92Z" fill="url(#ha-panel-light)" />
        <path d="M144 300v26M124 326h40" stroke="#0F2E24" strokeWidth="4" strokeLinecap="round" />
        <g stroke="#32D583" strokeOpacity="0.45" strokeWidth="1.2">
          <path d="M100 274h100M117 248l-9 52M150 248v52M183 248l9 52" />
        </g>
      </g>

      {/* Rangée principale */}
      <g>
        <path d="M228 352h216l-24-88H252Z" fill="url(#ha-panel)" />
        <path d="M228 352h216l-24-88H252Z" fill="url(#ha-panel-light)" />
        <path d="M336 352v40M300 392h72" stroke="#0F2E24" strokeWidth="6" strokeLinecap="round" />
        <g stroke="#32D583" strokeOpacity="0.5" strokeWidth="1.6">
          <path d="M240 308h192" />
          <path d="M288 264l-24 88M336 264v88M384 264l24 88" />
        </g>
        <path d="M228 352h216l-24-88H252Z" fill="none" stroke="#054F31" strokeWidth="2.5" />
      </g>

      {/* Éclair : énergie produite */}
      <path
        d="M470 236l-26 34h17l-6 26 27-36h-18Z"
        fill="#FFBB1C"
        stroke="#F5A200"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Feuilles au premier plan */}
      <g fill="#12B76A" fillOpacity="0.8">
        <path d="M64 392c-14-4-22-16-20-30 16-2 30 6 33 20 8-12 22-17 35-12-2 16-16 27-33 26-5 0-10-1-15-4Z" />
      </g>
    </svg>
  );
}
