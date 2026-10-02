import { useEffect } from "react";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact, { Footer } from "./Contact";

// Everything after the hero lives in its own chunk so the first screen paints sooner.
export default function BelowTheFold({ onReady }) {
  useEffect(() => {
    onReady?.();
    // A link like /#projects arrives before this chunk exists, so jump once it has rendered.
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, [onReady]);

  return (
    <>
      <Projects />
      <Experience />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
