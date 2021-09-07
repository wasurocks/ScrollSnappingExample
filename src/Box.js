import React from "react";
import "./styles.css";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const CHILD_VARIANTS_SCALE = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.1 }
};

const CHILD_VARIANTS_LEFT = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, x: -500 }
};

export const ContentBox = ({ color }) => {
  // <p>{`Header inside viewport ${inView}.`}</p>
  return (
    <div
      className="snap-child-start snap-child-stop"
      style={{
        paddingTop: 20,
        paddingBottom: 320,
        marginTop: 2,
        marginBottom: 2,
        width: "100%",
        backgroundColor: color,
        display: "flex",
        justifyItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "50vw" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
          vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra
          quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
          laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
          augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
          rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam
          semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
          blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio
          et ante tincidunt tempus. Donec vitae sapien ut libero venenatis
          faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
          tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales
          sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit
          cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend
          sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id,
          metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis
          hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; In ac dui quis mi
          consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor,
          suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam
          ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget,
          posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum
          rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero.
          Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla
          eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed
          lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo
          pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec
          neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis,
          nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere
          imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed
          cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus
          accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis
        </p>
      </div>
    </div>
  );
};

export const Box = ({
  color,
  full = false,
  half = false,
  transLeft = false,
  transScale = false,
  triggerOnce = false,
  children
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: triggerOnce
  });
  // <p>{`Header inside viewport ${inView}.`}</p>
  return (
    <div
      className="snap-child-center"
      ref={ref}
      style={{
        marginTop: 2,
        marginBottom: 2,
        height: full ? "100vh" : half ? "50vh" : 120,
        width: "100%",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <motion.div
        style={{
          backgroundColor: "white",
          zIndex: 40
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={
          transLeft
            ? CHILD_VARIANTS_LEFT
            : transScale
            ? CHILD_VARIANTS_SCALE
            : CHILD_VARIANTS_SCALE
        }
      >
        <h2
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            marginBottom: 10,
            fontSize: 43
          }}
        >
          {children}
        </h2>
      </motion.div>
    </div>
  );
};
