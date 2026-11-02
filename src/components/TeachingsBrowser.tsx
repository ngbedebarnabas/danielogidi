"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { TeachingItem } from "@/data/teachings";
import { TeachingCard } from "./TeachingCard";

export function TeachingsBrowser({ items }: { items: TeachingItem[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const [cat, setCat] = useState("All");
  const shown = items.filter((i) => cat === "All" || i.category === cat);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Teaching categories">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`relative rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              cat === c ? "border-transparent text-ink" : "border-fg/20 text-fg/70 hover:border-fg/50 hover:text-fg"
            }`}
          >
            {cat === c && (
              <motion.span
                layoutId="teaching-cat"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <TeachingCard item={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
