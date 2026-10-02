import {
  SiC,
  SiCplusplus,
  SiDotnet,
  SiGit,
  SiJavascript,
  SiLinux,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiSqlite,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import LogoLoop from "./reactbits/LogoLoop";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import { Reveal, Section } from "./ui";
import { credentials, education, skillGroups, spokenLanguages, techStack } from "../data/profile";

const TECH_ICONS = {
  Python: SiPython,
  PyTorch: SiPytorch,
  C: SiC,
  "C++": SiCplusplus,
  "C#": TbBrandCSharp,
  ".NET": SiDotnet,
  JavaScript: SiJavascript,
  React: SiReact,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  Java: FaJava,
  Git: SiGit,
  Linux: SiLinux,
};

const logos = techStack.map((name) => {
  const TechIcon = TECH_ICONS[name];
  return {
    title: name,
    node: (
      <span className="flex items-center gap-2.5 text-slate-400 transition-colors hover:text-white">
        {TechIcon && <TechIcon className="h-6 w-6" aria-hidden="true" />}
        <span className="text-[15px] font-medium">{name}</span>
      </span>
    ),
  };
});

export default function Skills() {
  return (
    <Section id="skills" index="04" eyebrow="Education & Skills" title="Foundations and toolkit.">
      <Reveal className="-mx-5 mb-10 sm:mx-0">
        <LogoLoop
          logos={logos}
          speed={45}
          direction="left"
          logoHeight={26}
          gap={44}
          pauseOnHover
          fadeOut
          fadeOutColor="#020617"
          ariaLabel="Technologies I work with"
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <BrandLogo name={education.logo} className="h-12 w-12" rounded="rounded-2xl" />
            <div>
              <h3 className="text-lg font-semibold leading-snug text-white">{education.degree}</h3>
              <p className="mt-1 text-sm text-slate-300">{education.school}</p>
              <p className="mt-1 font-mono text-xs text-slate-400">{education.date}</p>
            </div>
          </div>

          <div className="mt-7 border-t border-white/[0.06] pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">Certificates & awards</p>
            <ul className="mt-3 space-y-3">
              {credentials.map((item) => (
                <li key={item.title} className="flex gap-3">
                  {item.logo ? (
                    <BrandLogo name={item.logo} className="mt-0.5 h-5 w-5" rounded="rounded-[5px]" />
                  ) : (
                    <Icon name="award" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300/80" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm leading-snug text-slate-200">{item.title}</p>
                    <p className="font-mono text-xs text-slate-400">
                      {item.issuer} · {item.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">Spoken languages</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {spokenLanguages.map((language) => (
                <li key={language.name} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-200">
                  {language.name} <span className="text-slate-400">· {language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-7">
          <dl className="divide-y divide-white/[0.06]">
            {skillGroups.map((group) => (
              <div key={group.title} className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[130px_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400 sm:pt-1">{group.title}</dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-sm text-slate-200">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
