import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import FocusVisual from "./FocusVisuals";
import Rich from "./Rich";
import { Reveal, Section } from "./ui";
import { about, aboutTitle, focusAreas, hobbies } from "../data/profile";

const HOBBY_TONES = {
  guitar: "border-amber-300/25 bg-amber-300/10 text-amber-300",
  football: "border-emerald-300/25 bg-emerald-300/10 text-emerald-300",
};

export default function About() {
  return (
    <Section id="about" index="03" eyebrow="About" title={aboutTitle}>
      <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          {about.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="self-start">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">Off the keyboard</p>
          <ul className="mt-4 space-y-3">
            {hobbies.map((hobby) => (
              <li key={hobby.title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border ${HOBBY_TONES[hobby.icon] || ""}`}>
                  <Icon name={hobby.icon} className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-white">{hobby.title}</p>
                  <p className="text-sm leading-snug text-slate-400">
                    <Rich text={hobby.detail} strongClassName="font-semibold text-slate-100" />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300/80">What I work on</p>
      </Reveal>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {focusAreas.map((area, index) => (
          <Reveal
            key={area.title}
            as="article"
            delay={0.07 * index}
            className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
          >
            <FocusVisual kind={area.visual} />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3">
                {area.icon && (
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-300">
                    <Icon name={area.icon} className="h-5 w-5" />
                  </span>
                )}
                {area.logos.map((logo) => (
                  <BrandLogo key={logo} name={logo} className="h-9 w-9" rounded="rounded-lg" />
                ))}
                <h3 className="font-semibold leading-snug text-white">{area.title}</h3>
              </div>
              <p className="mt-5 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
                {area.stat}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{area.statLabel}</p>
              <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                {area.lines.map((line) => (
                  <li key={line} className="flex gap-2 text-sm leading-snug text-slate-400">
                    <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                    <span>
                      <Rich text={line} strongClassName="font-semibold text-slate-100" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
