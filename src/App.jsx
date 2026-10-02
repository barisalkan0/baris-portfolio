import { Suspense, lazy, useCallback, useState } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BackToTop from "./components/BackToTop";
import { Backdrop, ScrollProgress } from "./components/effects/Backdrop";
import { useFinePointer } from "./lib/hooks";
import { effects } from "./data/profile";

// Loaded after the first screen: sections below the hero, the QR dialog and the cursor trail.
const BelowTheFold = lazy(() => import("./components/BelowTheFold"));
const QrModal = lazy(() => import("./components/QrModal"));
const CursorTrail = lazy(() => import("./components/effects/CursorTrail"));

export default function App() {
  const [qrOpen, setQrOpen] = useState(false);
  const [sectionsReady, setSectionsReady] = useState(false);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const closeQr = useCallback(() => setQrOpen(false), []);
  const markSectionsReady = useCallback(() => setSectionsReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-slate-950 text-slate-300 selection:bg-cyan-300 selection:text-slate-950">
        <Backdrop />
        <ScrollProgress />
        {effects.cursorTrail && finePointer && !reducedMotion && (
          <Suspense fallback={null}>
            <CursorTrail />
          </Suspense>
        )}

        <Nav onShowQr={() => setQrOpen(true)} sectionsReady={sectionsReady} />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <BelowTheFold onReady={markSectionsReady} />
          </Suspense>
        </main>

        <BackToTop />

        {qrOpen && (
          <Suspense fallback={null}>
            <QrModal open={qrOpen} onClose={closeQr} />
          </Suspense>
        )}
      </div>
    </MotionConfig>
  );
}
