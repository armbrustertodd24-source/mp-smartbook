import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgPulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.85, 1.0]
  );

  const line1Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const line1Y = interpolate(frame, [0, 15], [40, 0], { extrapolateRight: "clamp" });

  const line2Opacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });

  const btnScale = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 180 } });
  const btnOpacity = interpolate(frame, [38, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #1a0a2e 0%, #0a0a0a 50%, #0d1b2a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 60px",
        boxSizing: "border-box",
        gap: 50,
      }}
    >
      {/* Warning line */}
      <div
        style={{
          opacity: line1Opacity,
          transform: `translateY(${line1Y}px)`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 52,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            color: "#ef4444",
            lineHeight: 1.2,
          }}
        >
          You're leaving money
        </span>
        <br />
        <span
          style={{
            fontSize: 52,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            color: "#ef4444",
          }}
        >
          on the table.
        </span>
      </div>

      {/* Sub text */}
      <div style={{ opacity: line2Opacity, textAlign: "center" }}>
        <span
          style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: "Arial, sans-serif",
            color: "#ffffff",
            lineHeight: 1.4,
          }}
        >
          Got skills or expertise?{"\n"}
          <span style={{ color: "#c4b5fd" }}>This is your move.</span>
        </span>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: btnOpacity,
          transform: `scale(${btnScale})`,
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          borderRadius: 60,
          padding: "30px 70px",
          boxShadow: `0 0 ${40 * bgPulse}px rgba(245, 158, 11, 0.6)`,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 46,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            letterSpacing: 1,
          }}
        >
          FOLLOW FOR MORE
        </span>
      </div>
    </div>
  );
};
