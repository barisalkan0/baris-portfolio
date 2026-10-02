# AI Memory — baris-portfolio

**Purpose:** Personal portfolio for Barış Alkan (Computer Engineering, METU NCC). Primary use: shown on a phone to company representatives at IAC 2026 (Antalya, 5–9 Oct 2026) — must read as professional within ~10 seconds.

**Stack:** React 19, Vite 8, Tailwind CSS 4 (`@tailwindcss/vite`), framer-motion 12, react-icons, qrcode.react, Geist fonts (@fontsource-variable). No backend.

**Architecture**
- `src/data/profile.js` — single source of all content + `SITE_URL` (from `VITE_SITE_URL` in `.env`) + effect flags.
- `src/App.jsx` — composition only (Backdrop, ScrollProgress, CursorTrail, Nav, sections, Footer, QrModal).
- `src/components/` — Nav, Hero, About, Experience, Projects (tilt cards + detection overlay), Skills, Contact (+ Footer, QrPanel), QrModal, Icon, ui (Container/Section/Reveal/Tag).
- `src/components/reactbits/` — adapted React Bits components (ProfileCard, BlurText, LogoLoop).
- `src/components/effects/` — CursorTrail (fine pointer only), MatrixRainSide (lg+, CSS animation), Backdrop (grid + mouse spotlight).
- `src/lib/assets.js` — `asset(...slots)` resolves optional images via `import.meta.glob`; dropping a file into `src/assets/<slot>.<ext>` activates it.
- `public/` — favicon.svg, apple-touch-icon.png, og.png (1200×630), baris-alkan.vcf, CV PDF slot (`Baris_Alkan_CV.pdf`).

**Page order:** Hero → 01 Selected work (Quadra first, big animated Google Play CTA) → 02 Experience (brand logos) → 03 About (narrative + What I work on cards with SVG visuals + hobbies) → 04 Education & Skills → 05 Contact. Back-to-top button bottom-right.

**Copy rules (from Barış):** no em dashes anywhere on the page (en dash only in date ranges); `**bold**` markup in profile.js for key numbers; keep CIFAR-10 CNN clearly separate from TEKNOFEST; official logos via `BrandLogo` (src/assets/logos).

**Design decisions:** dark slate + single cyan accent; subtle space allusion only (CSS horizon arc, grid, mono section labels) — not a space theme. CGPA/ranking intentionally hidden. Stock photo avoids real branded aircraft.

**Content source:** LinkedIn (read 2026-09-30): Microsoft Türkiye AI Innovators intern (Jul–Aug 2026), Başarsoft full-stack GIS intern (Aug–Sep 2026), CNG 213 assistant, ESC volunteer; projects RAG assistant, CIFAR-10 CNN, Quadra Rotate, Voiced Calculator. TEKNOFEST UAV comes from the old site (not on LinkedIn).

**Images:** `scripts/optimize-images.mjs` (predev/prebuild, sharp devDependency) writes `.webp` twins for photos >150 KB; `asset()` prefers `.webp`.

**Active work / next steps**
- User to add: CV PDF, TEKNOFEST/team photo, project screenshots (profile photos added).
- Deploy to Vercel before 5 Oct 2026, then set `VITE_SITE_URL` (enables QR/share/og URLs) and add URL to vCard.

**Constraints:** mobile-first (375px must show name, role, 3 proofs, résumé CTA on first screen); respect `prefers-reduced-motion`.

**Security risk level:** low — static site; no auth, payments, user data, forms or API keys. Not verified by audit beyond this review.
