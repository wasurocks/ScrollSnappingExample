import React from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useWindowSize } from "./hook-use-window-size";

export const DrawingLine = () => {
  const windowSize = useWindowSize();

  const { scrollY } = useViewportScroll();
  const height = useTransform(
    scrollY,
    (value) => value - windowSize.height * 0.5
  );

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          zIndex: 10
        }}
      >
        <motion.div
          style={{ backgroundColor: "black", width: 3, height: height }}
        />
      </div>
    </div>
  );
};
