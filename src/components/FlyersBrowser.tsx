"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { FlyerItem } from "@/data/flyers";
import { Overlay } from "./Overlay";
import { Poster } from "./Poster";
import { Download, Expand } from "./icons";

const filters = ["All", "Flyer", "Invitation"] as const;
type Filter = (typeof filters)[number];

export function FlyersBrowser({ items }: { items: FlyerItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<FlyerItem | null>(null);
  const shown = items.filter((i) => filter === "All" || i.type === filter);
  const label = (f: Filter) => (f === "All" ? "All" : f === "Flyer" ? "Flyers" : "Invitations");

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-6 py-3 text-sm font-bold transition-colors ${
              filter === f ? "text-ink" : "text-fg/70 hover:text-fg"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="flyer-filter"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{label(f)}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(item)}
                aria-label={`View ${item.type.toLowerCase()}: ${item.title}`}
                className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-line text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_24px_60px_-20px_rgba(245,184,46,0.35)]"
              >
                <Poster item={item} />
                <span data-theme="dark" className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-gold-ink uppercase backdrop-blur">
                  {item.type}
                </span>
                <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-gold text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand width={18} height={18} />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {open && (
          <Overlay label={`${open.type}: ${open.title}`} onClose={() => setOpen(null)}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-[min(92vw,calc(72vh*0.8))] flex-col gap-4 overflow-y-auto"
            >
              <div className="overflow-hidden rounded-2xl">
                <Poster item={open} sizes="(min-width: 640px) 520px, 92vw" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/invite"
                  className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
                >
                  Invite him to your event
                </Link>
                {open.image && (
                  <a
                    href={open.image}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-fg/25 px-6 py-3 text-sm font-bold transition-colors hover:border-gold hover:text-gold-ink"
                  >
                    <Download width={16} height={16} /> Download
                  </a>
                )}
              </div>
            </motion.div>
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
}
