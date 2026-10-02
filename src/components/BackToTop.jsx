import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Icon from "./Icon";

const RADIUS = 21;

// Floating button in the bottom-right corner; its ring fills up as you scroll.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (value) => setVisible(value > 700));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-5 right-5 z-[55] grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-slate-900/85 text-cyan-200 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.6)] backdrop-blur-md hover:text-white sm:bottom-7 sm:right-7"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="#67e8f9"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <Icon name="arrowUp" className="relative h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
