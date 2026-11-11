"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { EventItem } from "@/data/itinerary";
import { formatRange, googleCalendarUrl } from "@/lib/dates";
import { eventLocation, eventToFlyer } from "@/lib/events-format";
import { Overlay } from "./Overlay";
import { Poster } from "./Poster";
import { Calendar, Download, Expand, Pin } from "./icons";

export function EventCard({ event, past = false }: { event: EventItem; past?: boolean }) {
  const [open, setOpen] = useState(false);
  const flyer = eventToFlyer(event);
  const where = eventLocation(event);
  const kind = flyer.type.toLowerCase();

  return (
    <article
      className={`group grid gap-5 rounded-[1.75rem] border border-line bg-panel/70 p-5 transition-colors duration-300 hover:border-gold/50 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-6 ${
        past ? "opacity-70" : ""
      }`}
    >
      {/* Flyer (opens full size) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View ${kind}: ${event.title}`}
        className="group/flyer relative block w-full max-w-[15rem] shrink-0 overflow-hidden rounded-2xl border border-line shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-44 sm:max-w-none"
      >
        <Poster item={flyer} sizes="(min-width: 640px) 176px, 240px" />
        <span className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-gold text-ink opacity-0 transition-opacity duration-300 group-hover/flyer:opacity-100 group-focus-visible/flyer:opacity-100">
          <Expand width={16} height={16} />
        </span>
      </button>

      <div>
        <p className="mb-2 inline-block rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-gold-ink uppercase">
          {event.kind}
        </p>
        <h3 className="font-display text-xl leading-tight font-extrabold sm:text-2xl">{event.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg/65">{event.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg/80">
          <li className="flex items-center gap-2">
            <Calendar width={16} height={16} className="text-gold-ink" />
            {formatRange(event.start, event.end)}
          </li>
          <li className="flex items-center gap-2">
            <Pin width={16} height={16} className="text-gold-ink" />
            {[event.venue, where].filter(Boolean).join(" · ")}
          </li>
        </ul>
        {event.host && <p className="mt-2 text-xs text-muted">Hosted by {event.host}</p>}
      </div>

      {!past && (
        <a
          href={googleCalendarUrl({
            title: event.title,
            start: event.start,
            end: event.end,
            where: [event.venue, where].filter(Boolean).join(", "),
            details: event.description,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-fg/25 px-5 py-3 text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        >
          <Calendar width={15} height={15} /> Add to calendar
        </a>
      )}

      <AnimatePresence>
        {open && (
          <Overlay label={`${flyer.type}: ${event.title}`} onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-[min(92vw,calc(72vh*0.8))] flex-col gap-4 overflow-y-auto"
            >
              <div className="overflow-hidden rounded-2xl">
                <Poster item={flyer} sizes="(min-width: 640px) 520px, 92vw" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/invite"
                  className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
                >
                  Send Invite
                </Link>
                {flyer.image && (
                  <a
                    href={flyer.image}
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
    </article>
  );
}
