"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { Close } from "../icons";

/** Slide-over (`side`) or centred modal, theme-aware. Locks page scroll; closes on Esc or backdrop click. */
export function AdminDialog({
  open,
  onClose,
  label,
  variant = "modal",
  z = 100,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  variant?: "modal" | "side";
  z?: number;
  children: ReactNode;
}) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  const side = variant === "side";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          data-lenis-prevent
          style={{ zIndex: z }}
          className={`fixed inset-0 flex bg-black/55 backdrop-blur-[2px] ${
            side ? "justify-end" : "items-center justify-center p-4 sm:p-8"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={side ? { x: "100%" } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={side ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={side ? { x: "100%" } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex flex-col overflow-hidden bg-bg text-fg shadow-2xl ${
              side
                ? "h-full w-full max-w-2xl border-l border-line"
                : "max-h-full w-full max-w-2xl rounded-[1.75rem] border border-line"
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-fg/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <Close width={18} height={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
