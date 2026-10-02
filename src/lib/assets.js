// Every image under src/assets is bundled here, so a photo dropped into the right
// slot (e.g. src/assets/profile.jpg) shows up without touching any code.
const files = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  import: "default",
});

const EXTENSIONS = ["webp", "avif", "jpg", "jpeg", "png", "svg"];

// Returns the URL of the first slot that exists, e.g. asset("projects/teknofest-uav", "media/uav-stock").
export function asset(...names) {
  for (const name of names.filter(Boolean)) {
    for (const ext of EXTENSIONS) {
      const url = files[`../assets/${name}.${ext}`];
      if (url) return url;
    }
  }
  return null;
}
