import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${site.name} — ${site.tagline}`;

/** Emblème officiel, encodé en base64 : next/og n'accède pas au réseau. */
function markDataUri() {
  const file = path.join(process.cwd(), "public", "logo-mark.png");
  return `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`;
}

/**
 * Image de partage générée au build (Open Graph et Twitter Card).
 * Reprend la charte du site : fond noir, halo vert #2DD881 en haut,
 * pastille et libellés monospace.
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#050706",
          // Halo d'accent : le même que celui du haut de page.
          backgroundImage:
            "radial-gradient(900px 480px at 50% -140px, rgba(45,216,129,0.35), rgba(5,7,6,0) 70%)",
          color: "#E9F1EC",
          fontFamily: "sans-serif",
          borderTop: "10px solid #2DD881",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri()} width={76} height={76} alt="" />
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5, display: "flex" }}>
            <span style={{ color: "#A9B6AF" }}>HAZAV</span>
            <span style={{ color: "#2DD881" }}>&#8217;IARY</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 20,
              letterSpacing: 3,
              fontWeight: 700,
              color: "#2DD881",
              background: "#0B2217",
              border: "1px solid rgba(45,216,129,0.35)",
              borderRadius: 999,
              padding: "8px 18px",
              marginBottom: 26,
            }}
          >
            ÉNERGIE SOLAIRE &amp; SOLUTIONS VERTES
          </div>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1.5 }}>
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#A9B6AF",
            borderTop: "1px solid #1C2320",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>
            Installation · Stockage · Pompage · Maintenance
          </div>
          <div style={{ display: "flex", color: "#2DD881", fontWeight: 700 }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
