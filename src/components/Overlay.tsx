"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { Close } from "./icons";

/** Full-screen modal layer: locks page scroll, closes on Esc / backdrop click. */
export function Overlay({
  label,
  onClose,
  children,
}: {
  label: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      data-theme="dark"
      aria-modal="true"
      aria-label={label}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex text-fg items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-fg/10 text-fg transition-colors hover:bg-gold hover:text-ink sm:top-6 sm:right-6"
      >
        <Close />
      </button>
      {children}
    </motion.div>
  );
}
