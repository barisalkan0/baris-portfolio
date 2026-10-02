import { useEffect, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts up to the number inside `value` on load ("93.31%", "40+", "2").
// Keeps the prefix/suffix and the number of decimals; shows the final value
// straight away when the visitor prefers reduced motion.
export default function CountUp({ value, delay = 0, duration = 1.4, className = "" }) {
  const raw = String(value ?? "");
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[2]) : null;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [current, setCurrent] = useState(target === null || reduced() ? target : 0);

  useEffect(() => {
    if (target === null || reduced()) return;
    let raf;
    const start = performance.now() + delay * 1000;
    const step = (now) => {
      const k = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
      setCurrent(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration]);

  if (target === null) return <span className={className}>{raw}</span>;
  return (
    <span className={`tabular-nums ${className}`}>
      {match[1]}
      {current.toFixed(decimals)}
      {match[3]}
    </span>
  );
}
