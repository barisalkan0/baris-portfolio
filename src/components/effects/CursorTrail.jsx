import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const GLYPHS = ["AI", "</>", "01", "{}", "ML", "λ", "π", "10"];
const ORBIT_RADIUS = 40;

// Each glyph follows the one before it with a slightly softer spring, forming a trail.
function useTrail(sourceX, sourceY) {
  const x1 = useSpring(sourceX, { stiffness: 85, damping: 30 });
  const y1 = useSpring(sourceY, { stiffness: 85, damping: 30 });
  const x2 = useSpring(x1, { stiffness: 78, damping: 31 });
  const y2 = useSpring(y1, { stiffness: 78, damping: 31 });
  const x3 = useSpring(x2, { stiffness: 71, damping: 32 });
  const y3 = useSpring(y2, { stiffness: 71, damping: 32 });
  const x4 = useSpring(x3, { stiffness: 64, damping: 33 });
  const y4 = useSpring(y3, { stiffness: 64, damping: 33 });
  const x5 = useSpring(x4, { stiffness: 57, damping: 34 });
  const y5 = useSpring(y4, { stiffness: 57, damping: 34 });
  const x6 = useSpring(x5, { stiffness: 50, damping: 35 });
  const y6 = useSpring(y5, { stiffness: 50, damping: 35 });
  const x7 = useSpring(x6, { stiffness: 44, damping: 36 });
  const y7 = useSpring(y6, { stiffness: 44, damping: 36 });
  const x8 = useSpring(x7, { stiffness: 38, damping: 37 });
  const y8 = useSpring(y7, { stiffness: 38, damping: 37 });

  return [
    [x1, y1],
    [x2, y2],
    [x3, y3],
    [x4, y4],
    [x5, y5],
    [x6, y6],
    [x7, y7],
    [x8, y8],
  ];
}

export default function CursorTrail() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const trail = useTrail(mouseX, mouseY);

  const [isStopped, setIsStopped] = useState(false);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [glyphs, setGlyphs] = useState(GLYPHS);
  const stateRef = useRef({ stopped: false, orbiting: false });

  useEffect(() => {
    let stopTimeout;
    let idleTimeout;

    const setStopped = (value) => {
      if (stateRef.current.stopped !== value) {
        stateRef.current.stopped = value;
        setIsStopped(value);
      }
    };
    const setOrbiting = (value) => {
      if (stateRef.current.orbiting !== value) {
        stateRef.current.orbiting = value;
        setIsOrbiting(value);
      }
    };

    const handleMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setStopped(false);
      setOrbiting(false);

      clearTimeout(stopTimeout);
      clearTimeout(idleTimeout);
      stopTimeout = setTimeout(() => setStopped(true), 120);
      idleTimeout = setTimeout(() => setOrbiting(true), 5000);
    };

    const shuffle = setInterval(() => {
      setGlyphs((previous) => {
        const next = [...previous];
        const first = Math.floor(Math.random() * next.length);
        let second = Math.floor(Math.random() * next.length);
        while (second === first) second = Math.floor(Math.random() * next.length);
        [next[first], next[second]] = [next[second], next[first]];
        return next;
      });
    }, 900);

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(shuffle);
      clearTimeout(stopTimeout);
      clearTimeout(idleTimeout);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {trail.map(([x, y], index) => {
        const angle = (Math.PI * 2 * index) / trail.length;
        const size = 15 - index;
        const opacity = 0.8 - index * 0.085;

        return (
          <motion.div
            key={index}
            style={{ x, y, opacity }}
            animate={isOrbiting ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 8, repeat: isOrbiting ? Infinity : 0, ease: "linear" }}
            className="absolute left-0 top-0 will-change-transform"
          >
            <motion.span
              animate={
                isStopped
                  ? { x: Math.cos(angle) * ORBIT_RADIUS, y: Math.sin(angle) * ORBIT_RADIUS }
                  : { x: 0, y: 0 }
              }
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              style={{ display: "inline-block", fontSize: size, translateX: "-50%", translateY: "-50%" }}
              className="font-mono font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.7)]"
            >
              {glyphs[index]}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
