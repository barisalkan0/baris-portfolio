// Creates a lightweight .webp next to every large photo in src/assets.
// The site prefers the .webp automatically (see src/lib/assets.js), so you can
// drop full-size PNG/JPG files in and phones still download small images.
// Runs before `npm run dev` and `npm run build`; only re-encodes when the source changed.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

// sharp is a native module; if it is missing on some machine/CI, skip quietly (the committed .webp files are used).
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("sharp not available, skipping image optimization");
  process.exit(0);
}

const ROOT = path.resolve("src/assets");
const MIN_BYTES = 150 * 1024; // smaller files are left alone
const DEFAULT_WIDTH = 1600;
const WIDTHS = { profile: 900, "profile-cutout": 900, "quadra-cover": 288 };

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

let converted = 0;
for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const { size, mtimeMs } = await stat(file);
  if (size < MIN_BYTES) continue;

  const base = path.basename(file, ext);
  const target = path.join(path.dirname(file), `${base}.webp`);
  if ((await mtime(target)) >= mtimeMs) continue;

  const width = WIDTHS[base] ?? DEFAULT_WIDTH;
  const info = await sharp(file)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 5 })
    .toFile(target);

  converted += 1;
  console.log(`optimized ${path.relative(ROOT, file)} → ${path.basename(target)} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

if (converted === 0) console.log("images up to date");
