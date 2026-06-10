import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Story } from "./scenes/Scene3Story";
import { Scene4CTA } from "./scenes/Scene4CTA";

// Scene durations in frames (30fps)
const HOOK_FRAMES = 90;       // 3s
const PROBLEM_FRAMES = 120;   // 4s
const STORY_FRAMES = 180;     // 6s
const CTA_FRAMES = 120;       // 4s

export const VideoComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={HOOK_FRAMES}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={HOOK_FRAMES} durationInFrames={PROBLEM_FRAMES}>
        <Scene2Problem />
      </Sequence>
      <Sequence from={HOOK_FRAMES + PROBLEM_FRAMES} durationInFrames={STORY_FRAMES}>
        <Scene3Story />
      </Sequence>
      <Sequence from={HOOK_FRAMES + PROBLEM_FRAMES + STORY_FRAMES} durationInFrames={CTA_FRAMES}>
        <Scene4CTA />
      </Sequence>
    </AbsoluteFill>
  );
};

export const TOTAL_FRAMES = HOOK_FRAMES + PROBLEM_FRAMES + STORY_FRAMES + CTA_FRAMES;
