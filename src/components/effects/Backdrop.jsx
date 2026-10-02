import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useFinePointer } from "../../lib/hooks";

// Fixed engineering grid plus a soft spotlight that follows the mouse.
export function Backdrop() {
  const spotlightRef = useRef(null);
  const finePointer = useFinePointer();

  useEffect(() => {
    if (!finePointer) return;
    const element = spotlightRef.current;
    let frame = 0;

    const handleMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element?.style.setProperty("--mx", `${event.clientX}px`);
        element?.style.setProperty("--my", `${event.clientY}px`);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [finePointer]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-3xl" />
      {finePointer && (
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx, -1000px) var(--my, -1000px), rgba(34,211,238,0.075), transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-200"
      aria-hidden="true"
    />
  );
}
