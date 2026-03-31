import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Subrat Ojha — Java Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0d1117",
          fontFamily: "monospace",
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 900,
            borderRadius: 12,
            border: "1px solid #30363d",
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 16px",
              backgroundColor: "#161b22",
              borderBottom: "1px solid #30363d",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
            <span style={{ marginLeft: 12, fontSize: 14, color: "#484f58" }}>
              subrat@arch — bash
            </span>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px 32px",
              gap: 8,
            }}
          >
            {/* Prompt */}
            <div style={{ display: "flex", fontSize: 20 }}>
              <span style={{ color: "#3fb950" }}>subrat@arch</span>
              <span style={{ color: "#8b949e" }}>:</span>
              <span style={{ color: "#539bf5" }}>~</span>
              <span style={{ color: "#8b949e" }}>$ </span>
              <span style={{ color: "#e6edf3" }}>neofetch</span>
            </div>

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 16 }}>
              <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
                <span style={{ color: "#3fb950" }}>Subrat Ojha</span>
              </div>
              <div style={{ display: "flex", fontSize: 20, color: "#8b949e", marginTop: 4 }}>
                Java Developer @ IbaseIt Inc.
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 16 }}>
                <span style={{ color: "#539bf5" }}>Java 17+</span>
                <span style={{ color: "#3fb950" }}>Spring Boot</span>
                <span style={{ color: "#e3b341" }}>Microservices</span>
                <span style={{ color: "#539bf5" }}>Docker</span>
                <span style={{ color: "#ffa657" }}>AWS</span>
              </div>

              {/* Color blocks */}
              <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
                {["#0d1117", "#f85149", "#3fb950", "#e3b341", "#539bf5", "#8957e5", "#58a6ff", "#e6edf3"].map(
                  (c) => (
                    <div
                      key={c}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        backgroundColor: c,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
