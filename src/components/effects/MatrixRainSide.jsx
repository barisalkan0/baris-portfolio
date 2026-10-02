const COLUMN_COUNT = 12;
const DIGITS_PER_COLUMN = 36;

// Generated once at module load so the digits never reshuffle on re-render.
// Each column is a single text node (digits joined by newlines) to keep the DOM small.
const columns = Array.from({ length: COLUMN_COUNT }, (_, index) => {
  const digits = Array.from({ length: DIGITS_PER_COLUMN }, () => (Math.random() > 0.5 ? "1" : "0"));
  return { text: [...digits, ...digits].join("\n"), duration: 9 + ((index * 7) % 11) * 1.4 };
});

function RainColumns({ side }) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} flex w-36 overflow-hidden opacity-[0.09]`}
      style={{ maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)" }}
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className="rain-column mx-[2px] whitespace-pre text-center font-mono text-[13px] leading-[20px] text-cyan-300"
          style={{ animationDuration: `${side === "left" ? column.duration : column.duration * 1.15}s` }}
        >
          {column.text}
        </div>
      ))}
    </div>
  );
}

// Binary rain on both sides of the hero. Mounted on large screens only (see Hero).
export default function MatrixRainSide() {
  return (
    <div aria-hidden="true">
      <RainColumns side="left" />
      <RainColumns side="right" />
    </div>
  );
}
