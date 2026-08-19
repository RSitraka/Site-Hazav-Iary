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
 * Reprend la charte de l'application : fond clair, accent turquoise,
 * libellés monospace, filet d'accent — comme les tuiles `.stat`.
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
          background: "#FFFFFF",
          color: "#14181C",
          fontFamily: "sans-serif",
          borderTop: "10px solid #17788A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri()} width={76} height={76} alt="" />
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5, display: "flex" }}>
            <span style={{ color: "#4B555F" }}>HAZAV</span>
            <span style={{ color: "#17788A" }}>&#8217;IARY</span>
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
              color: "#17788A",
              background: "#E2EFF2",
              border: "1px solid #A8CDD5",
              borderRadius: 2,
              padding: "6px 12px",
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
            color: "#4B555F",
            borderTop: "1px solid #E3E6E9",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>
            Installation · Stockage · Pompage · Maintenance
          </div>
          <div style={{ display: "flex", color: "#DE7A00", fontWeight: 700 }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
