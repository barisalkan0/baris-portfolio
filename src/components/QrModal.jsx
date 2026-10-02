import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import { QrPanel } from "./Contact";
import { SITE_URL, person } from "../data/profile";

// Full-screen QR so someone can scan the site straight from Barış's phone.
export default function QrModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && SITE_URL && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="QR code for this page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/90 p-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-8 text-center"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
            <p className="text-lg font-semibold text-white">{person.name}</p>
            <p className="mt-1 text-sm text-slate-400">
              {person.role} · {person.school}
            </p>
            <div className="mt-6">
              <QrPanel size={220} />
            </div>
            <p className="mt-2 break-all font-mono text-xs text-cyan-300/80">{SITE_URL.replace(/^https?:\/\//, "")}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
