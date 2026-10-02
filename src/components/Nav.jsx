import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Icon from "./Icon";
import { Container } from "./ui";
import { useActiveSection } from "../lib/hooks";
import { cx } from "../lib/utils";
import { asset } from "../lib/assets";
import { RESUME_URL, SITE_URL, person } from "../data/profile";

const LINKS = [
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = LINKS.map((link) => link.id);
const avatar = asset(person.photoCutout, person.photo);

export default function Nav({ onShowQr, sectionsReady }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(SECTION_IDS, sectionsReady);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    if (!open) return;
    const handleKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {avatar ? (
            <span className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-b from-slate-600 to-slate-900 ring-2 ring-cyan-300/40 ring-offset-2 ring-offset-slate-950">
              <img src={avatar} alt="" className="h-full w-full object-cover object-[50%_18%]" />
            </span>
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 font-mono text-[13px] font-semibold text-cyan-200">
              {person.initials}
            </span>
          )}
          <span className="hidden text-sm font-medium tracking-tight text-white min-[390px]:inline">{person.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={cx(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                active === link.id ? "bg-white/[0.06] text-white" : "text-slate-400 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {SITE_URL && (
            <button
              type="button"
              onClick={onShowQr}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
              aria-label="Show QR code for this page"
            >
              <Icon name="qr" className="h-4 w-4" />
            </button>
          )}
          <a
            href={RESUME_URL || "#contact"}
            {...(RESUME_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950"
          >
            <Icon name={RESUME_URL ? "file" : "mail"} className="h-4 w-4" />
            {RESUME_URL ? "Resume" : "Contact"}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-200 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} className="h-4 w-4" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <Container className="flex flex-col py-3">
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-2 py-3 text-base text-slate-200 active:bg-white/5"
                >
                  {link.label}
                  <Icon name="arrow" className="h-4 w-4 text-slate-500" />
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-white/[0.06] px-2 pt-4">
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                  <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
                </a>
                <a href={person.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                  <Icon name="github" className="h-4 w-4" /> GitHub
                </a>
                <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                  <Icon name="mail" className="h-4 w-4" /> Email
                </a>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
