import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import Rich from "./Rich";
import { Reveal, Section, Tag } from "./ui";
import { experience } from "../data/profile";

function Organisation({ item }) {
  if (!item.href) return <span className="text-cyan-300">{item.org}</span>;
  const external = item.href.startsWith("http");
  return (
    <a
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
    >
      {item.org}
      <Icon name="external" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function Experience() {
  return (
    <Section id="experience" index="02" eyebrow="Experience" title="Where I've been building.">
      <ol className="group/list space-y-3">
        {experience.map((item, index) => (
          <Reveal as="li" key={`${item.role}-${item.date}`} delay={0.05 * index}>
            <div className="group grid gap-3 rounded-2xl border border-transparent p-4 transition duration-300 hover:border-white/10 hover:bg-white/[0.03] sm:grid-cols-[150px_1fr] sm:gap-8 sm:p-6 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400 sm:pt-3">{item.date}</p>
              <div className="max-w-3xl">
                <div className="flex items-center gap-4">
                  <BrandLogo name={item.logo} className="h-12 w-12" rounded="rounded-2xl" />
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">{item.role}</h3>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm">
                      <Organisation item={item} />
                      {item.meta && <span className="text-slate-400">· {item.meta}</span>}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                  <Rich text={item.detail} />
                </p>
                {item.points?.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                        <span>
                          <Rich text={point} strongClassName="font-semibold text-slate-100" />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {(item.tags?.length > 0 || item.link) && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {item.tags?.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                    {item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] leading-none text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                      >
                        <Icon name="github" className="h-3 w-3" />
                        {item.link.label}
                        <Icon name="external" className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
