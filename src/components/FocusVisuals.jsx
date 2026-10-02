import { LuCar, LuPlane } from "react-icons/lu";
import Icon from "./Icon";

// Small illustrations drawn on top of the "What I work on" cards (pure SVG/CSS, no images).

function Grid() {
  return (
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
  );
}

function Box({ className, label, children }) {
  const corner = "absolute h-2.5 w-2.5 border-cyan-300";
  return (
    <div className={`absolute ${className}`}>
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
      <span className="absolute -top-4 left-0 rounded-sm bg-cyan-300 px-1 font-mono text-[9px] font-bold leading-4 text-slate-950">{label}</span>
      <div className="grid h-full w-full place-items-center">{children}</div>
    </div>
  );
}

function DetectionVisual() {
  return (
    <>
      <Grid />
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_40%,rgba(34,211,238,0.18),transparent_70%)]" />
      <Box className="left-[14%] top-[30%] h-[44%] w-[30%]" label="uav">
        <LuPlane className="h-8 w-8 -rotate-12 text-white/85" aria-hidden="true" />
      </Box>
      <Box className="right-[12%] top-[38%] h-[40%] w-[28%]" label="car">
        <LuCar className="h-7 w-7 text-white/80" aria-hidden="true" />
      </Box>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 transition-all duration-[1400ms] ease-linear group-hover:top-full group-hover:opacity-100" />
    </>
  );
}

function ChatVisual() {
  return (
    <>
      <Grid />
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_70%_30%,rgba(56,189,248,0.2),transparent_70%)]" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/70 px-2 py-0.5 font-mono text-[9px] text-slate-300">
        <Icon name="offline" className="h-3 w-3" /> offline
      </span>
      <div className="absolute inset-x-4 bottom-3 space-y-1.5 text-[10px] leading-snug">
        <p className="ml-auto w-fit max-w-[80%] rounded-xl rounded-br-sm bg-slate-700/80 px-2.5 py-1.5 text-slate-100">What does chapter 3 say about safety?</p>
        <div className="w-fit max-w-[85%] rounded-xl rounded-bl-sm border border-sky-300/30 bg-sky-400/15 px-2.5 py-1.5 text-sky-50 transition-transform duration-500 group-hover:-translate-y-0.5">
          It lists three checks before launch…
          <span className="mt-1 block w-fit rounded bg-slate-950/60 px-1.5 font-mono text-[8.5px] text-sky-200">source: manual.pdf · p.12</span>
        </div>
      </div>
    </>
  );
}

function MapVisual() {
  return (
    <svg viewBox="0 0 300 128" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="128" fill="#0b1224" />
      <path d="M-10 92 C 60 70, 110 110, 170 84 S 260 60, 320 76" fill="none" stroke="#1e3a5f" strokeWidth="10" />
      <g stroke="rgba(148,163,184,0.18)" strokeWidth="1.5">
        <line x1="20" y1="0" x2="60" y2="128" />
        <line x1="95" y1="0" x2="120" y2="128" />
        <line x1="170" y1="0" x2="185" y2="128" />
        <line x1="240" y1="0" x2="250" y2="128" />
        <line x1="0" y1="30" x2="300" y2="18" />
        <line x1="0" y1="60" x2="300" y2="52" />
        <line x1="0" y1="112" x2="300" y2="104" />
      </g>
      <path
        d="M34 102 L 58 57 L 118 50 L 128 22 L 182 20 L 246 16"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 5"
        className="[animation:map-dash_1.6s_linear_infinite] motion-reduce:[animation:none]"
      />
      {[
        [34, 102],
        [118, 50],
        [246, 16],
        [205, 90],
        [80, 20],
      ].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="9" fill="rgba(52,211,153,0.18)" />
          <circle cx={x} cy={y} r="4" fill="#34d399" stroke="#022c22" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="150" y="14" width="16" height="10" rx="3" fill="#fbbf24" />
      <text x="170" y="12" fill="#fde68a" fontSize="8" fontFamily="monospace">live bus</text>
    </svg>
  );
}

function TreeVisual() {
  const nodes = [
    { x: 150, y: 24, v: 42, hot: true },
    { x: 90, y: 62, v: 17 },
    { x: 210, y: 62, v: 68, hot: true },
    { x: 60, y: 102, v: 8 },
    { x: 120, y: 102, v: 25 },
    { x: 180, y: 102, v: 54, hot: true },
    { x: 240, y: 102, v: 91 },
  ];
  const edges = [
    [0, 1],
    [0, 2, true],
    [1, 3],
    [1, 4],
    [2, 5, true],
    [2, 6],
  ];
  return (
    <svg viewBox="0 0 300 128" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="300" height="128" fill="#0b1224" />
      {edges.map(([a, b, hot]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={hot ? "#22d3ee" : "rgba(148,163,184,0.35)"}
          strokeWidth={hot ? 2.5 : 1.5}
        />
      ))}
      {nodes.map((node) => (
        <g key={node.v}>
          <circle cx={node.x} cy={node.y} r="13" fill={node.hot ? "#083344" : "#1e293b"} stroke={node.hot ? "#67e8f9" : "rgba(148,163,184,0.4)"} strokeWidth="1.5" />
          <text x={node.x} y={node.y + 3.5} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={node.hot ? "#cffafe" : "#cbd5e1"}>
            {node.v}
          </text>
        </g>
      ))}
      <text x="8" y="14" fontSize="8" fontFamily="monospace" fill="#64748b">search(54) · O(log n)</text>
    </svg>
  );
}

const VISUALS = { detection: DetectionVisual, chat: ChatVisual, map: MapVisual, tree: TreeVisual };

export default function FocusVisual({ kind }) {
  const Visual = VISUALS[kind];
  return (
    <div className="relative h-32 overflow-hidden border-b border-white/10 bg-[#0b1224]" aria-hidden="true">
      {Visual && <Visual />}
    </div>
  );
}
