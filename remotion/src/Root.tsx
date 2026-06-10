import React from "react";
import { Composition } from "remotion";
import { VideoComposition, TOTAL_FRAMES } from "./VideoComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AIMoneyShort"
        component={VideoComposition}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
