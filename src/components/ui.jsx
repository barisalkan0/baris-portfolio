import { motion } from "framer-motion";
import { cx } from "../lib/utils";

export function Container({ className = "", children }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({ id, index, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={cx("relative z-10 py-20 sm:py-28", className)}>
      <Container>
        <Reveal className="mb-10 sm:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300/80">
            <span className="text-slate-400">{index}</span> <span className="text-slate-600">/</span> {eyebrow}
          </p>
          {title && <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}

export function Reveal({ children, className = "", delay = 0, as = "div", ...props }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Tag({ children }) {
  return (
    <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2.5 py-1 font-mono text-[11px] leading-none text-cyan-200/90">
      {children}
    </span>
  );
}
