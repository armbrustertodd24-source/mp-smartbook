import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

const bullets = [
  { icon: "📚", text: "Take your expertise" },
  { icon: "🤖", text: "Structure it with AI" },
  { icon: "💰", text: "Digital products that sell while you sleep" },
  { icon: "🚫", text: "No tech degree. No startup." },
];

export const Scene3Story: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #0a0a0a 0%, #0d1b2a 70%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 70px",
        boxSizing: "border-box",
        gap: 50,
      }}
    >
      {/* Header */}
      <div style={{ opacity: headerOpacity, textAlign: "center" }}>
        <span
          style={{
            fontSize: 40,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            color: "#c4b5fd",
            letterSpacing: 1,
          }}
        >
          Here's what actually works:
        </span>
      </div>

      {/* Bullet list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
          width: "100%",
        }}
      >
        {bullets.map((b, i) => {
          const start = 10 + i * 18;
          const opacity = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [start, start + 12], [-50, 0], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 28,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 16,
                padding: "22px 30px",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              <span style={{ fontSize: 44 }}>{b.icon}</span>
              <span
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  fontFamily: "Arial, sans-serif",
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                {b.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
