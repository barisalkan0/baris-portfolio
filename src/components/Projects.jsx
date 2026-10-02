import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { LuBird, LuCar, LuCat, LuDog, LuPlane, LuShip, LuTruck } from "react-icons/lu";
import { GiDeer, GiFrog, GiHorseHead } from "react-icons/gi";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import Rich from "./Rich";
import { Reveal, Section, Tag } from "./ui";
import { asset } from "../lib/assets";
import { useFinePointer } from "../lib/hooks";
import { cx, toneClass } from "../lib/utils";
import { featuredProjects, moreProjects } from "../data/profile";

const ACCENTS = {
  cyan: "rgba(34,211,238,0.30)",
  violet: "rgba(167,139,250,0.32)",
  sky: "rgba(56,189,248,0.30)",
  fuchsia: "rgba(217,70,239,0.34)",
};

function Highlight({ highlight }) {
  const className = cx(
    "absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md",
    toneClass(highlight.tone),
  );
  return (
    <span className={className}>
      {highlight.logo ? (
        <BrandLogo name={highlight.logo} className="h-4 w-4" rounded="rounded-[3px]" />
      ) : (
        <Icon name="check" className="h-3.5 w-3.5" />
      )}
      {highlight.label}
    </span>
  );
}

function LiveBadge({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md transition hover:border-emerald-300/60"
    >
      <span className="radar-dot" aria-hidden="true" />
      Live on Google Play
    </a>
  );
}

function CoverBackdrop({ accent, children }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${ACCENTS[accent] || ACCENTS.cyan}, transparent 55%), radial-gradient(90% 80% at 90% 100%, rgba(14,165,233,0.18), transparent 60%), #0b1224`,
      }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 75%)",
        }}
      />
      {children}
    </div>
  );
}

// Three phones fanned out, showing the real Play Store screenshots.
function PhonesCover({ project }) {
  const shots = project.cover.shots.map((slot) => asset(slot)).filter(Boolean);
  const appIcon = project.appIcon && asset(project.appIcon);
  const layout = [
    "z-0 -translate-x-2 translate-y-5 -rotate-[9deg] scale-[0.84] opacity-80 group-hover:-translate-x-5 group-hover:-rotate-[13deg]",
    "z-10 translate-y-2 group-hover:-translate-y-1",
    "z-0 translate-x-2 translate-y-5 rotate-[9deg] scale-[0.84] opacity-80 group-hover:translate-x-5 group-hover:rotate-[13deg]",
  ];

  return (
    <CoverBackdrop accent={project.accent}>
      <div className="absolute -bottom-10 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 top-9 flex items-start justify-center">
        {shots.map((src, index) => (
          <div
            key={src}
            className={cx(
              "-mx-3 w-[27%] max-w-[150px] overflow-hidden rounded-[1.1rem] border-[3px] border-slate-700/80 bg-black shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] transition-transform duration-700 sm:rounded-[1.4rem]",
              layout[index],
            )}
          >
            <img src={src} alt="" loading="lazy" className="block aspect-[9/16] w-full object-cover object-top" />
          </div>
        ))}
      </div>
      {appIcon && (
        <img
          src={appIcon}
          alt=""
          loading="lazy"
          className="absolute bottom-4 right-4 z-20 h-12 w-12 rounded-xl shadow-[0_10px_30px_-8px_rgba(217,70,239,0.8)] ring-1 ring-white/20 sm:h-14 sm:w-14"
        />
      )}
    </CoverBackdrop>
  );
}

// Terminal-style sketch of the RAG pipeline (used until a screenshot is added).
function PipelineCover({ project }) {
  const steps = project.cover.steps;
  return (
    <CoverBackdrop accent={project.accent}>
      <div className="absolute inset-x-0 bottom-0 top-12 flex items-center justify-center px-4 pb-2 sm:px-6">
        <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 font-mono text-[10px] leading-relaxed shadow-2xl backdrop-blur transition-transform duration-700 group-hover:-translate-y-1 sm:text-[11px]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 inline-flex items-center gap-1 text-slate-500">
              <Icon name="offline" className="h-3 w-3" /> local · offline
            </span>
          </div>
          <div className="space-y-1 px-3 py-2.5">
            <p className="text-slate-200">
              <span className="text-sky-300">$</span> ask &quot;What does the report conclude?&quot;
            </p>
            <p className="text-slate-400">› {steps.slice(0, 4).join(" → ").toLowerCase()}</p>
            <p className="text-slate-400">› context → {steps[steps.length - 1]} (on-device)</p>
            <p className="text-emerald-300">✓ grounded answer, or &quot;not in the docs&quot;</p>
          </div>
        </div>
      </div>
    </CoverBackdrop>
  );
}

const CIFAR_CLASSES = [
  { name: "airplane", Icon: LuPlane, hue: 200 },
  { name: "car", Icon: LuCar, hue: 12 },
  { name: "bird", Icon: LuBird, hue: 48 },
  { name: "cat", Icon: LuCat, hue: 280 },
  { name: "deer", Icon: GiDeer, hue: 30 },
  { name: "dog", Icon: LuDog, hue: 330 },
  { name: "frog", Icon: GiFrog, hue: 130 },
  { name: "horse", Icon: GiHorseHead, hue: 20 },
  { name: "ship", Icon: LuShip, hue: 190 },
  { name: "truck", Icon: LuTruck, hue: 0 },
];

// The ten CIFAR-10 classes as a mini dataset grid, next to the headline accuracy.
function CifarCover({ project }) {
  const { value, from, label } = project.cover;
  const toPct = parseFloat(value);
  const fromPct = parseFloat(from);

  return (
    <CoverBackdrop accent={project.accent}>
      <div className="absolute inset-0 grid grid-cols-[1fr_auto] items-center gap-4 px-5 pt-6 sm:gap-6 sm:px-7">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-violet-200/80 sm:text-[11px]">{label}</p>
          <p className="mt-1 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
            {value}
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="relative h-full" style={{ width: `${toPct}%` }}>
              <span className="absolute inset-y-0 left-0 bg-slate-400/60" style={{ width: `${(fromPct / toPct) * 100}%` }} />
              <span
                className="absolute inset-y-0 right-0 rounded-r-full bg-gradient-to-r from-violet-400 to-cyan-300"
                style={{ width: `${100 - (fromPct / toPct) * 100}%` }}
              />
            </div>
          </div>
          <p className="mt-1.5 flex justify-between gap-2 font-mono text-[10px] text-slate-400 sm:text-[11px]">
            <span>from {from}</span>
            <span className="text-cyan-200">+{(toPct - fromPct).toFixed(2)} pts</span>
          </p>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {CIFAR_CLASSES.map(({ name, Icon: ClassIcon, hue }, index) => (
            <div
              key={name}
              title={name}
              className={cx(
                "relative grid h-7 w-7 place-items-center rounded-md border transition-transform duration-500 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-lg",
                index === 3 ? "border-cyan-300 shadow-[0_0_18px_-2px_rgba(103,232,249,0.7)]" : "border-white/10",
              )}
              style={{ background: `linear-gradient(145deg, hsla(${hue}, 70%, 55%, 0.35), hsla(${hue + 30}, 60%, 30%, 0.25))` }}
            >
              <ClassIcon className="h-3.5 w-3.5 text-white/90 sm:h-5 sm:w-5" aria-hidden="true" />
              {index === 3 && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-cyan-300 px-1 font-mono text-[8px] font-bold text-slate-950 sm:-top-5 sm:text-[9px]">
                  cat ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </CoverBackdrop>
  );
}

function IconCover({ project }) {
  return (
    <CoverBackdrop accent={project.accent}>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-white/[0.06] text-white/85 shadow-2xl backdrop-blur transition-transform duration-700 group-hover:scale-105">
          <Icon name={project.icon} className="h-9 w-9" />
        </span>
      </div>
    </CoverBackdrop>
  );
}

// YOLO-style target box: "tracking" at rest, "locked" when the card is hovered.
function DetectionOverlay({ box }) {
  const corner = "absolute h-3 w-3 border-cyan-300 transition-colors duration-300 group-hover:border-amber-300";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <div
        className="absolute animate-pulse transition-all duration-500 group-hover:animate-none motion-reduce:animate-none"
        style={{ left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` }}
      >
        <span className={cx(corner, "left-0 top-0 border-l-2 border-t-2")} />
        <span className={cx(corner, "right-0 top-0 border-r-2 border-t-2")} />
        <span className={cx(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
        <span className={cx(corner, "bottom-0 right-0 border-b-2 border-r-2")} />
        <span className="absolute left-0 top-full mt-1.5 whitespace-nowrap rounded-sm bg-cyan-300/90 px-1.5 py-px font-mono text-[10px] font-semibold text-slate-950 transition-colors duration-300 group-hover:bg-amber-300">
          <span className="group-hover:hidden">TRACKING · uav 0.91</span>
          <span className="hidden group-hover:inline">LOCKED · uav 0.97</span>
        </span>
      </div>
      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <span className="absolute left-1/2 top-0 h-full w-px bg-cyan-200" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-cyan-200" />
      </div>
      <p className="absolute bottom-3 left-4 font-mono text-[10px] tracking-wider text-cyan-200/70">CAM-01 · OBJECT DETECTION</p>
    </div>
  );
}

const COVERS = { phones: PhonesCover, pipeline: PipelineCover, cifar: CifarCover };

function Cover({ project }) {
  const image = asset(...project.image);
  const badge = project.badge && asset(project.badge);
  const showOverlay = project.overlay && image && image === asset(project.overlay.slot);
  const Generated = COVERS[project.cover?.kind] || IconCover;

  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.8] saturate-[0.75] transition duration-700 group-hover:scale-[1.04] group-hover:brightness-95 group-hover:saturate-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-slate-950/30" />
          {showOverlay && <DetectionOverlay box={project.overlay.box} />}
        </>
      ) : (
        <Generated project={project} />
      )}
      {badge && (
        <span className="absolute bottom-4 right-4 z-10 rounded-xl bg-white/90 px-2 py-1.5 shadow-lg">
          <img src={badge} alt="TEKNOFEST" className="h-7 w-auto" loading="lazy" />
        </span>
      )}
    </div>
  );
}

// Big, animated call to action for the published game.
function PlayStoreButton({ href }) {
  const playLogo = asset("google-play-logo");
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="play-cta group/cta relative z-30 mt-5 block w-full sm:w-auto sm:self-start">
      <span className="flex items-center gap-3 rounded-[0.9rem] bg-slate-950 px-5 py-3 transition-colors group-hover/cta:bg-slate-900">
        {playLogo && <img src={playLogo} alt="" className="h-7 w-auto" />}
        <span className="text-left leading-tight">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">Get it on</span>
          <span className="block text-lg font-semibold text-white">Google Play</span>
        </span>
        <Icon
          name="external"
          className="ml-auto h-4 w-4 text-slate-400 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 group-hover/cta:text-white sm:ml-4"
        />
      </span>
    </a>
  );
}

function ProjectCard({ project, index }) {
  const finePointer = useFinePointer();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 18 });
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.13), transparent 42%)`;

  const handleMove = (event) => {
    if (!finePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 7);
    rotateY.set((px - 0.5) * 7);
    shineX.set(px * 100);
    shineY.set(py * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Reveal id={project.id} delay={0.07 * index} className="h-full scroll-mt-24" style={{ perspective: 1000 }}>
      <motion.article
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 transition-[border-color,box-shadow] duration-300 hover:border-cyan-300/30 hover:shadow-[0_24px_60px_-30px_rgba(34,211,238,0.35)]"
      >
        <span className="absolute inset-x-0 top-0 z-40 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-300 to-sky-400 transition-transform duration-500 group-hover:scale-x-100" />
        <motion.div
          style={{ background: shine }}
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {project.playStore ? <LiveBadge href={project.playStore} /> : project.highlight && <Highlight highlight={project.highlight} />}
        <Cover project={project} />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <p className="font-mono text-xs text-cyan-300/90">{project.type}</p>
            <p className="font-mono text-xs text-slate-400">{project.year}</p>
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
            <Rich text={project.description} strongClassName="font-semibold text-slate-100" />
          </p>
          {project.playStore && <PlayStoreButton href={project.playStore} />}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-30 ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] leading-none text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                <Icon name="github" className="h-3 w-3" />
                {link.label}
                <Icon name="external" className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function MoreProject({ project, index }) {
  const Wrapper = project.link ? "a" : "div";
  const linkProps = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Reveal delay={0.04 * index} className="h-full">
      <Wrapper
        {...linkProps}
        className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition-colors hover:border-cyan-300/30 hover:bg-slate-900/70 sm:p-5"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
          <Icon name={project.icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h4 className="font-semibold text-white">{project.title}</h4>
            {project.status && (
              <span className="rounded-full border border-sky-300/25 bg-sky-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sky-200">
                {project.status}
              </span>
            )}
            {project.award && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                <Icon name="award" className="h-3 w-3" /> {project.award}
              </span>
            )}
            {project.link && (
              <span className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-slate-400 transition-colors group-hover:text-white">
                <Icon name="github" className="h-3 w-3" /> Code
                <Icon name="external" className="h-3 w-3" />
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            <Rich text={project.highlight} strongClassName="font-semibold text-slate-100" />
          </p>
          <p className="mt-2 font-mono text-[11px] text-cyan-300/80">
            {project.stack} <span className="text-slate-500">·</span> <span className="text-slate-400">{project.year}</span>
          </p>
        </div>
      </Wrapper>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section id="projects" index="01" eyebrow="Projects" title="Selected work.">
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <Reveal className="mt-16 flex items-end justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-tight text-white">More projects</h3>
        <p className="font-mono text-xs text-slate-400">{moreProjects.length} more</p>
      </Reveal>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {moreProjects.map((project, index) => (
          <MoreProject key={project.title} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
