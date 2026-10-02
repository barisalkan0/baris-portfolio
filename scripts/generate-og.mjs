// Renders public/og.png (1200×630 link preview for LinkedIn/WhatsApp) and public/apple-touch-icon.png.
// Run with `npm run og` after changing the name, headline or the three proof chips below.
import { readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(".");
const ASSETS = path.join(ROOT, "src/assets");
const OUT = path.join(ROOT, "public");

const dataUri = (buffer, type = "image/png") => `data:${type};base64,${buffer.toString("base64")}`;

// librsvg cannot embed webp, so the photo is converted to a small PNG first.
const photoBuffer = await sharp(path.join(ASSETS, "profile-cutout.png")).resize({ width: 300 }).png().toBuffer();
const photo = dataUri(photoBuffer);
const teknofest = dataUri(readFileSync(path.join(ASSETS, "teknofest-logo.png")));

const LOGOS = {
  microsoft: `<g transform="translate(26 30) scale(1.04)"><rect width="10" height="10" fill="#f25022"/><rect x="11" width="10" height="10" fill="#7fba00"/><rect y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></g>`,
  teknofest: `<image href="${teknofest}" x="20" y="27" width="36" height="27" preserveAspectRatio="xMidYMid meet"/>`,
  basarsoft: `<g transform="translate(22 25) scale(1.05)"><polygon fill="#0093d9" points="8.77 1.87 0 10.64 18.41 11.52 28.93 1 8.77 1.87"/><polygon fill="#162c54" points="18.41 11.52 19.29 29.93 28.06 21.16 28.94 1 18.41 11.52"/></g>`,
};

const chip = (x, logo, title, sub) => `
  <g transform="translate(${x} 430)">
    <rect width="300" height="84" rx="16" fill="#0b1224" stroke="rgba(255,255,255,0.12)"/>
    <rect x="16" y="20" width="44" height="44" rx="10" fill="#ffffff"/>${LOGOS[logo]}
    <text x="76" y="38" font-size="19" font-weight="600" fill="#ffffff">${title}</text>
    <text x="76" y="62" font-size="15" fill="#94a3b8">${sub}</text>
  </g>`;

const grid =
  Array.from({ length: 22 }, (_, i) => `<line x1="${i * 56}" y1="0" x2="${i * 56}" y2="630" />`).join("") +
  Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 56}" x2="1200" y2="${i * 56}" />`).join("");

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Segoe UI, Helvetica, Arial, sans-serif">
  <defs>
    <radialGradient id="glow" cx="50%" cy="100%" r="70%">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="top" cx="15%" cy="0%" r="60%">
      <stop offset="0" stop-color="#0891b2" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#0891b2" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="gm"><rect width="1200" height="630" fill="url(#gridFade)"/></mask>
    <clipPath id="av"><circle cx="1066" cy="112" r="64"/></clipPath>
    <linearGradient id="avbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#334155"/><stop offset="1" stop-color="#0f172a"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#020617"/>
  <rect width="1200" height="630" fill="url(#top)"/>
  <g stroke="rgba(148,163,184,0.07)" stroke-width="1" mask="url(#gm)">${grid}</g>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <ellipse cx="600" cy="1590" rx="1500" ry="1000" fill="#020617" stroke="#a5f3fc" stroke-opacity="0.55" stroke-width="2"/>

  <g transform="translate(80 92)">
    <rect width="286" height="38" rx="19" fill="#34d399" fill-opacity="0.08" stroke="#6ee7b7" stroke-opacity="0.3"/>
    <circle cx="22" cy="19" r="5" fill="#34d399"/>
    <text x="38" y="25" font-size="17" fill="#d1fae5">Open to internships · AI &amp; CV</text>
  </g>
  <text x="76" y="228" font-size="92" font-weight="700" fill="#ffffff" letter-spacing="-2">Barış Alkan</text>
  <text x="80" y="284" font-size="30" fill="#e2e8f0">Computer Engineering <tspan fill="#64748b">@</tspan> Middle East Technical University</text>
  <text x="80" y="336" font-size="24" fill="#94a3b8">AI &amp; computer vision on UAVs, on-device and on the map</text>

  ${chip(80, "microsoft", "Microsoft Türkiye", "AI Innovators Intern · 2026")}
  ${chip(400, "teknofest", "TEKNOFEST Fighter UAV", "Passed Technical Qualification")}
  ${chip(720, "basarsoft", "Başarsoft", "Full-Stack GIS Intern · 2026")}

  <circle cx="1066" cy="112" r="64" fill="url(#avbg)"/>
  <image href="${photo}" x="998" y="44" width="136" height="153" clip-path="url(#av)" preserveAspectRatio="xMidYMin slice"/>
  <circle cx="1066" cy="112" r="66" fill="none" stroke="#67e8f9" stroke-opacity="0.6" stroke-width="3"/>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#020617"/>
  <rect x="14" y="14" width="152" height="152" rx="34" fill="#083344" fill-opacity="0.5" stroke="#67e8f9" stroke-opacity="0.5" stroke-width="4"/>
  <text x="90" y="112" text-anchor="middle" font-family="Consolas, monospace" font-size="64" font-weight="700" fill="#a5f3fc">BA</text>
</svg>`;

const results = await Promise.all([
  sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(path.join(OUT, "og.png")),
  sharp(Buffer.from(icon)).png().toFile(path.join(OUT, "apple-touch-icon.png")),
]);
results.forEach((r) => console.log(`${r.width}×${r.height}`, `${Math.round(r.size / 1024)} KB`));
