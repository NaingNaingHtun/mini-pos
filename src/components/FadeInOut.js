import React from "react";
import { useTransition, animated } from "react-spring";

const FadeInOut = ({ show, children }) => {
  const transition = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return transition(
    (styles, item) =>
      item && <animated.div style={styles}>{children}</animated.div>
  );
};

export default FadeInOut;
