import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Icon from "./Icon";
import { Container, Reveal, Section } from "./ui";
import { RESUME_URL, SITE_URL, VCARD_URL, person } from "../data/profile";

function TerminalTitle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const fullText = "Let's build something useful.";
  const [text, setText] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setText(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <h2 ref={ref} className="min-h-[2.5em] font-mono text-3xl font-semibold tracking-tight text-white sm:min-h-0 sm:text-4xl" aria-label={fullText}>
      <span aria-hidden="true">{text}</span>
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        className="text-cyan-300"
      >
        |
      </motion.span>
    </h2>
  );
}

function ContactRow({ icon, label, value, href, download, children }) {
  const external = href?.startsWith("http") || href?.endsWith(".pdf");
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/40 pr-2 transition-colors hover:border-cyan-300/30">
      <a
        href={href}
        {...(download ? { download } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
          <Icon name={icon} className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-white">{label}</span>
          <span className="block truncate font-mono text-xs text-slate-400">{value}</span>
        </span>
      </a>
      {children}
    </div>
  );
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
    </button>
  );
}

export function QrPanel({ size = 148 }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-2xl bg-white p-3 shadow-[0_0_40px_-10px_rgba(103,232,249,0.6)]">
        <QRCodeSVG value={SITE_URL} size={size} bgColor="#ffffff" fgColor="#020617" level="M" marginSize={0} />
      </div>
      <p className="max-w-[14rem] text-xs leading-relaxed text-slate-400">Scan to open this page on your phone</p>
    </div>
  );
}

function ShareButton() {
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  if (!canShare || !SITE_URL) return null;

  const share = () => navigator.share({ title: `${person.name} | Portfolio`, url: SITE_URL }).catch(() => {});

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
    >
      <Icon name="share" className="h-4 w-4" />
      Share this page
    </button>
  );
}

export default function Contact() {
  return (
    <Section id="contact" index="05" eyebrow="Contact">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/60 p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className={SITE_URL ? "relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center" : "relative"}>
          <div>
            <TerminalTitle />
            <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
              I'm open to internships in AI, computer vision and autonomous systems, and always happy to talk with teams
              building ambitious hardware and software. Email or LinkedIn is the fastest way to reach me.
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              <ContactRow icon="mail" label="Email" value={person.email} href={`mailto:${person.email}`}>
                <CopyButton value={person.email} />
              </ContactRow>
              <ContactRow icon="linkedin" label="LinkedIn" value={`in/${person.linkedinHandle}`} href={person.linkedin} />
              <ContactRow icon="github" label="GitHub" value={person.githubHandle} href={person.github} />
              <ContactRow icon="file" label="Resume" value="PDF · opens in a new tab" href={RESUME_URL} />
              <ContactRow icon="userPlus" label="Save contact" value="Add me to your phone" href={VCARD_URL} download="Baris-Alkan.vcf" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
              <ShareButton />
            </div>
          </div>

          {SITE_URL && <QrPanel />}
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-8">
      <Container className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} {person.name}</p>
        <p className="font-mono">Built with React &amp; Vite</p>
      </Container>
    </footer>
  );
}
