# Barış Alkan portfolio

Personal portfolio for Barış Alkan (Computer Engineering, Middle East Technical University, NCC).
Main use: shown on a phone to company representatives (aerospace, defense, tech) at IAC 2026, Antalya, 5–9 Oct 2026.
A visitor gives it ~10 seconds, so the first mobile screen has to sell him.

Live site: **https://barisalkan0.github.io**. Every push to `main` deploys automatically (`.github/workflows/deploy.yml` builds, lints and publishes to the `barisalkan0/barisalkan0.github.io` repo; takes ~1–2 minutes). Check progress with `gh run list -R barisalkan0/baris-portfolio`.

Two people work on this repo from different computers: **Barış** and **Derin**. Talk to them in **Turkish**.

## Commands

```bash
npm install
npm run dev              # http://localhost:5173 (also re-optimizes large photos first)
npm run build            # production build → dist/
npm run lint
npm run og               # regenerate public/og.png (link preview) after changing name, headline or proof chips
npm run optimize-images  # writes small .webp twins for photos > 150 KB (runs automatically before dev/build)
```

Before saying something is done: `npm run lint` and `npm run build` must pass, and check the page at 375×812 (mobile) and desktop width: no console errors, no horizontal scroll.

## Where things live

- `src/data/profile.js`: **all content** (texts, experience, projects, skills, links, effect flags). Most edits happen here.
  - `**word**` renders bold (see `src/components/Rich.jsx`).
  - Logos are referenced by key: `microsoft`, `basarsoft`, `teknofest`, `metu`, `esc`, `googleplay` (`src/components/BrandLogo.jsx`, files in `src/assets/logos/`).
  - Images are "slots" (path under `src/assets`, no extension). Dropping a file with that name in `src/assets` makes it appear; `src/lib/assets.js` resolves it.
- `src/components/`: Nav, Hero, Projects, Experience, About (+ `FocusVisuals.jsx` illustrations), Skills, Contact, QrModal, BackToTop.
- `src/components/reactbits/`: adapted React Bits components (ProfileCard, BlurText, LogoLoop).
- `src/components/effects/`: CursorTrail, MatrixRainSide, Backdrop. Switch on/off with `effects` in `profile.js`.
- `public/`: favicon, og.png, apple-touch-icon, `baris-alkan.vcf` ("Save contact"), and the CV slot `Baris_Alkan_CV.pdf`.
  - **`public/app-ads.txt` must never be removed or changed.** barisalkan0.github.io is the developer website of Quadra Rotate on Google Play and AdMob reads this file from the site root.
- `docs/AI_MEMORY.md`: short architecture + decision log. Keep it current after significant changes.

Page order: Hero → 01 Selected work (Quadra Rotate first) → 02 Experience → 03 About → 04 Education & Skills → 05 Contact.

## Content and style rules (from Barış, follow strictly)

- **No em dashes (—) anywhere on the page.** He reads them as AI-written text. Use commas, colons or periods. An en dash (–) is OK only inside date ranges like "Aug – Sep 2026".
- Make key numbers and achievements **bold**, selectively (e.g. **40+ students**, **8,700+ real places**), not everything.
- Use the real company/organisation logos, never generic icons, for companies.
- The CIFAR-10 CNN is a **personal project**. Never present it as related to the TEKNOFEST UAV work.
- Write "Resume", not "Résumé".
- Don't invent facts, titles or numbers. Use only what is in his CV/LinkedIn; ask when unsure. On LinkedIn both internships are titled just "Intern".
- CGPA and ranking are hidden on purpose.
- Plain text-only sections feel boring to him: give sections visuals (illustrations, logos, stats), but keep the overall look calm: dark slate + one cyan accent, subtle space hints only (horizon glow, grid). Not a full space theme.
- Mobile first: at 375 px the first screen must show name, university, the 3 logo proof chips and "View Resume".
- Respect `prefers-reduced-motion`; keep heavy effects desktop-only.

## Open tasks

1. **CV**: put the updated PDF at `public/Baris_Alkan_CV.pdf` and push. The Resume buttons are hidden until that file exists (`vite.config.js` checks at build time), then appear automatically.
2. Optional photos: `src/assets/projects/teknofest-uav.jpg` (replaces the stock photo + detection overlay), `projects/rag-assistant.png`, `projects/cifar10.png`.

## Git workflow (two machines)

- `git pull` before starting, small focused commits, `git push` when done.
- Never commit `node_modules/`, `dist/` or `.env.local`.
- Security: static site, no auth, payments, forms or secrets. Keep it that way; never put API keys or tokens in this public repo.
