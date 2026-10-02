import { asset } from "../lib/assets";
import { cx } from "../lib/utils";

// Official logos, shown on a white tile so every brand keeps its real colours.
const LOGOS = {
  microsoft: { slot: "logos/microsoft", alt: "Microsoft", pad: "p-[22%]" },
  basarsoft: { slot: "logos/basarsoft", alt: "Başarsoft", pad: "p-[16%]" },
  teknofest: { slot: "teknofest-logo", alt: "TEKNOFEST", pad: "p-[6%]" },
  metu: { slot: "metu-logo", alt: "Middle East Technical University", pad: "p-[12%]" },
  esc: { slot: "logos/esc", alt: "European Solidarity Corps", pad: "p-[14%]" },
  googleplay: { slot: "google-play-logo", alt: "Google Play", pad: "p-[20%]" },
};

export default function BrandLogo({ name, className = "h-10 w-10", rounded = "rounded-xl" }) {
  const logo = LOGOS[name];
  const src = logo && asset(logo.slot);
  if (!src) return null;

  return (
    <span className={cx("grid shrink-0 place-items-center overflow-hidden bg-white shadow-[0_4px_18px_-6px_rgba(0,0,0,0.6)] ring-1 ring-white/20", rounded, className)}>
      <img src={src} alt={logo.alt} className={cx("h-full w-full object-contain", logo.pad)} loading="lazy" />
    </span>
  );
}
