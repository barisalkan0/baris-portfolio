export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const toneClasses = {
  amber: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  emerald: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
  sky: "border-sky-300/25 bg-sky-400/10 text-sky-200",
  violet: "border-violet-300/25 bg-violet-400/10 text-violet-200",
};

export function toneClass(tone) {
  return toneClasses[tone] || toneClasses.cyan;
}
