import { motion } from "framer-motion";
import BlurText from "./reactbits/BlurText";
import ProfileCard from "./reactbits/ProfileCard";
import MatrixRainSide from "./effects/MatrixRainSide";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import { Container } from "./ui";
import { asset } from "../lib/assets";
import { useMediaQuery } from "../lib/hooks";
import CountUp from "./effects/CountUp";
import { RESUME_URL, VCARD_URL, effects, heroStats, person, proofs } from "../data/profile";

const portrait = asset(person.photoCutout, person.photo, "placeholder-portrait");

// Softer than the BlurText default (which drops 50px) so the name never overlaps the status pill.
const NAME_FROM = { filter: "blur(10px)", opacity: 0, y: 14 };
const NAME_TO = [
  { filter: "blur(4px)", opacity: 0.6, y: -2 },
  { filter: "blur(0px)", opacity: 1, y: 0 },
];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

// A thin, glowing planetary horizon along the bottom of the first screen.
function HorizonGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[34svh] min-h-56 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[160vw] -translate-x-1/2 rounded-[100%] bg-cyan-400/10 blur-3xl" />
      <div className="absolute left-1/2 top-[58%] aspect-square w-[280vw] -translate-x-1/2 rounded-full border-t border-cyan-100/45 bg-slate-950 shadow-[0_-1px_18px_rgba(165,243,252,0.4),0_-18px_90px_rgba(34,211,238,0.2)] sm:w-[300vw] lg:w-[340vw]" />
    </div>
  );
}

function ProofChip({ proof }) {
  const external = proof.href.startsWith("http");
  return (
    <a
      href={proof.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex h-full items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2.5 backdrop-blur-sm transition hover:border-cyan-300/30 hover:bg-slate-900/80 sm:py-3"
    >
      <BrandLogo name={proof.logo} className="h-10 w-10" rounded="rounded-lg" />
      <span className="min-w-0">
        <span className="block text-sm font-medium leading-snug text-white">{proof.label}</span>
        <span className="block text-xs leading-snug text-slate-400">{proof.detail}</span>
      </span>
    </a>
  );
}

const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-full bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_32px_-8px_rgba(103,232,249,0.7)] transition hover:bg-cyan-200";
const secondaryButton =
  "inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.08]";

const iconButton =
  "grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-white";

export default function Hero() {
  // The holographic card and binary rain only exist on large screens, so phones never pay for them.
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="top" className="relative z-10 flex min-h-[100svh] items-center overflow-hidden pb-40 pt-24 sm:pb-44 sm:pt-28">
      {effects.matrixRain && isDesktop && <MatrixRainSide />}
      <HorizonGlow />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-16">
        <div>
          <motion.div {...fadeUp(0)} className="flex items-center gap-4">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3.5 py-1.5 text-xs text-emerald-100 sm:text-[13px]">
              <span className="radar-dot mx-0.5" aria-hidden="true" />
              {person.status}
              <span className="hidden text-emerald-100/70 sm:inline">· {person.statusDetail}</span>
            </p>
          </motion.div>

          <BlurText
            as="h1"
            text={person.name}
            delay={100}
            animationFrom={NAME_FROM}
            animationTo={NAME_TO}
            className="mt-6 text-[2.9rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          />

          <motion.div {...fadeUp(0.1)} className="mt-4 flex items-center gap-3">
            <BrandLogo name="metu" className="h-9 w-9" rounded="rounded-full" />
            <p className="text-base leading-snug text-slate-200 sm:text-lg">
              {person.year && <span className="text-slate-300">{person.year} </span>}
              {person.role} <span className="text-slate-400">@</span> {person.university}
              {person.campus && (
                <>
                  <span className="mx-1.5 text-slate-500" aria-hidden="true">·</span>
                  {person.campus}
                </>
              )}
            </p>
          </motion.div>

          <motion.p {...fadeUp(0.15)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            {person.headline}
          </motion.p>

          {heroStats.length > 0 && (
            <motion.ul
              {...fadeUp(0.18)}
              className="mt-7 grid max-w-2xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm sm:grid-cols-4"
            >
              {heroStats.map((stat, i) => (
                <li
                  key={stat.label}
                  className={`px-3 py-3.5 ${i % 2 ? "border-l border-white/10" : ""} ${
                    i > 1 ? "border-t border-white/10 sm:border-t-0" : ""
                  } ${i === 2 ? "sm:border-l" : ""}`}
                >
                  <p className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-2xl font-semibold leading-none tracking-tight text-transparent">
                    <CountUp value={stat.value} delay={0.5 + i * 0.12} />
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-slate-400">{stat.label}</p>
                </li>
              ))}
            </motion.ul>
          )}

          <motion.ul {...fadeUp(0.2)} className="mt-5 grid gap-2.5 sm:grid-cols-[1fr_1.18fr_1fr]">
            {proofs.map((proof) => (
              <li key={proof.label}>
                <ProofChip proof={proof} />
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.25)} className="mt-8 flex flex-wrap items-center gap-3">
            {RESUME_URL && (
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                <Icon name="file" className="h-4 w-4" />
                View Resume
              </a>
            )}
            <a href={VCARD_URL} download="Baris-Alkan.vcf" className={RESUME_URL ? secondaryButton : primaryButton}>
              <Icon name="userPlus" className="h-4 w-4" />
              Save contact
            </a>
            <div className="flex items-center gap-2">
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="LinkedIn profile">
                <Icon name="linkedin" className="h-4 w-4" />
              </a>
              <a href={person.github} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="GitHub profile">
                <Icon name="github" className="h-4 w-4" />
              </a>
              <a href={`mailto:${person.email}`} className={iconButton} aria-label={`Email ${person.email}`}>
                <Icon name="mail" className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex justify-center"
          >
            <ProfileCard
              avatarUrl={portrait}
              miniAvatarUrl={null}
              name={person.name}
              title={person.cardTitle}
              handle={person.linkedinHandle}
              status="Open to internships"
              contactText="Contact"
              onContactClick={scrollToContact}
              showUserInfo
              enableTilt
              enableMobileTilt={false}
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
}
