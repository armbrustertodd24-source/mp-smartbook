import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineOneOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const lineOneY = interpolate(frame, [0, 15], [40, 0], { extrapolateRight: "clamp" });

  const lineTwoOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const lineTwoY = interpolate(frame, [20, 35], [40, 0], { extrapolateRight: "clamp" });

  const badgeScale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 200 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #0a0a0a 0%, #0d1b2a 60%, #1a0a2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 60px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Badge */}
      <div
        style={{
          transform: `scale(${badgeScale})`,
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          borderRadius: 50,
          padding: "14px 36px",
          marginBottom: 60,
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            letterSpacing: 2,
          }}
        >
          2026 ALERT
        </span>
      </div>

      {/* Line 1 */}
      <div
        style={{
          opacity: lineOneOpacity,
          transform: `translateY(${lineOneY}px)`,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <span
          style={{
            fontSize: 88,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            color: "#f59e0b",
            lineHeight: 1.0,
            display: "block",
          }}
        >
          99%
        </span>
        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            fontFamily: "Arial Black, sans-serif",
            color: "#ffffff",
            lineHeight: 1.2,
            display: "block",
          }}
        >
          of people are SLEEPING
        </span>
      </div>

      {/* Line 2 */}
      <div
        style={{
          opacity: lineTwoOpacity,
          transform: `translateY(${lineTwoY}px)`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 44,
            fontWeight: 700,
            fontFamily: "Arial, sans-serif",
            color: "#c4b5fd",
            lineHeight: 1.3,
          }}
        >
          on the easiest{"\n"}AI money move
        </span>
      </div>
    </div>
  );
};
