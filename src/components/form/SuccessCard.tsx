"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "../Button";

export function SuccessCard({
  title,
  children,
  onReset,
  resetLabel,
}: {
  title: string;
  children: ReactNode;
  onReset: () => void;
  resetLabel: string;
}) {
  // The form above was taller than this card, so bring the confirmation into view.
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      className="rounded-[2rem] border border-gold/40 bg-panel p-8 text-center sm:p-12"
    >
      <svg viewBox="0 0 80 80" className="mx-auto size-20" aria-hidden>
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.path
          d="m25 41 11 11 20-23"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
        />
      </svg>
      <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight">{title}</h2>
      <div className="mx-auto mt-4 max-w-md space-y-3 text-fg/70">{children}</div>
      <div className="mt-8">
        <Button variant="outline" onClick={onReset}>
          {resetLabel}
        </Button>
      </div>
    </motion.div>
  );
}
