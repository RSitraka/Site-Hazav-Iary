import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${site.name} — ${site.tagline}`;

/**
 * Image de partage générée au build (Open Graph et Twitter Card).
 * Rendue en PNG 1200×630 par next/og, sans dépendance externe.
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
          padding: "72px",
          background: "linear-gradient(135deg, #061511 0%, #0A211A 55%, #05261D 100%)",
          color: "#ECF5F1",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Halo solaire */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 640,
            background:
              "radial-gradient(circle, rgba(255,206,77,0.55) 0%, rgba(245,162,0,0.18) 45%, rgba(245,162,0,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #FFCE4D, #F5A200)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "#061511",
            }}
          >
            H
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#32D583",
              marginBottom: 20,
              display: "flex",
            }}
          >
            Énergie solaire &amp; solutions vertes
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5 }}>
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(236,245,241,0.72)",
            borderTop: "1px solid rgba(236,245,241,0.16)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            Installation · Stockage · Pompage · Maintenance
          </div>
          <div style={{ display: "flex", color: "#FFBB1C", fontWeight: 600 }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
