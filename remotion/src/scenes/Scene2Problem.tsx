import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 12], [30, 0], { extrapolateRight: "clamp" });

  const line1Opacity = interpolate(frame, [15, 27], [0, 1], { extrapolateRight: "clamp" });
  const line2Opacity = interpolate(frame, [27, 39], [0, 1], { extrapolateRight: "clamp" });
  const line3Opacity = interpolate(frame, [39, 51], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #0d1b2a 0%, #0a0a0a 50%, #1a0a2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 70px",
        boxSizing: "border-box",
        gap: 40,
      }}
    >
      {/* Section label */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          background: "rgba(239, 68, 68, 0.2)",
          border: "2px solid #ef4444",
          borderRadius: 8,
          padding: "10px 28px",
        }}
      >
        <span
          style={{
            color: "#ef4444",
            fontSize: 30,
            fontWeight: 800,
            fontFamily: "Arial Black, sans-serif",
            letterSpacing: 3,
          }}
        >
          THE PROBLEM
        </span>
      </div>

      {/* Lines */}
      {[
        { text: "Everyone's chasing", opacity: line1Opacity },
        { text: "SaaS & apps.", opacity: line2Opacity },
        { text: "The real money is different.", opacity: line3Opacity },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            opacity: item.opacity,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: i === 1 ? 68 : 52,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: i === 1 ? "#f59e0b" : "#ffffff",
              lineHeight: 1.2,
            }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};
