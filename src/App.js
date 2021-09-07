import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

import { motion, useTransform, useElementScroll } from "framer-motion";
import { useWindowSize } from "./hook-use-window-size";
import { Box, ContentBox } from "./Box";

const LINE_VARIANTS = {
  visible: { height: "75vh", transition: { duration: 2 } },
  hidden: { height: "0vh" }
};

const SnapParent = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} {...props} className="snap-parent-y-mandatory">
    {props.children}
  </div>
));

const Container = ({ children }) => {
  const windowSize = useWindowSize();
  const ref = useRef();
  const { scrollY, scrollYProgress } = useElementScroll(ref);

  const pageRange = [0, 0.15, 0.3, 0.5, 0.7, 1];
  const lengthRange = ["75vh", "45vh", "50vh", "45vh", "50vh", "100vh"];
  const calcHeight = useTransform(scrollYProgress, pageRange, lengthRange);

  const [scrollYValue, setScrollYValue] = useState(0);
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0);

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    scrollY.onChange((v) => setScrollYValue(v));
    scrollYProgress.onChange((v) => setScrollYProgressValue(v));
  }, [scrollY, scrollYProgress]);

  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          fontFamily: "monospace",
          fontWeight: 600,
          zIndex: 50
        }}
      >
        {"height: " +
          calcHeight.get() +
          " | y: " +
          scrollYValue +
          " | percentage: " +
          (scrollYProgressValue * 100).toFixed(0) +
          "% | WindowSize h: " +
          windowSize.height +
          " w: " +
          windowSize.width +
          "   "}
        <button onClick={refreshPage}>refresh</button>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          zIndex: 20,
          pointerEvents: "none"
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={LINE_VARIANTS}
          style={{ backgroundColor: "black", width: 3, height: calcHeight }}
        />
      </div>
      <SnapParent
        ref={ref}
        style={{
          position: "absolute"
        }}
      >
        {children}
      </SnapParent>
    </div>
  );
};

function ScrollSample() {
  return (
    <Container>
      <header>Hello World</header>
      <Box full color="#FDD692">
        Box 1 (full)
      </Box>
      <Box half triggerOnce transLeft color="#C5E99B">
        Box 2 (half)
      </Box>
      <Box full color="#84B1ED">
        Box 3 (full)
      </Box>
      <Box half triggerOnce transLeft color="#67D5B5">
        Box 4 (half)
      </Box>
      <Box full color="#FDD692">
        Box 5 (full)
      </Box>
      <ContentBox color="white">Box 6 (full)</ContentBox>
      <Box full color="#84B1ED">
        Box 6 (full)
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <div>
      <ScrollSample />
    </div>
  );
}
