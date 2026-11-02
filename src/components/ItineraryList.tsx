"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { EventBuckets } from "@/lib/events";
import { Button } from "./Button";
import { EventCard } from "./EventCard";

export function ItineraryList({ upcoming, past }: EventBuckets) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div>
      <div className="mb-8 flex gap-2" role="tablist" aria-label="Itinerary">
        {(
          [
            ["upcoming", `Upcoming (${upcoming.length})`],
            ["past", `Past (${past.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`relative rounded-full px-6 py-3 text-sm font-bold transition-colors ${
              tab === key ? "text-ink" : "text-fg/70 hover:text-fg"
            }`}
          >
            {tab === key && (
              <motion.span
                layoutId="itinerary-tab"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          {list.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-line p-10 text-center">
              <p className="font-display text-xl font-extrabold">
                {tab === "upcoming" ? "No upcoming engagements are listed right now." : "No past engagements to show."}
              </p>
              {tab === "upcoming" && (
                <>
                  <p className="mx-auto mt-3 max-w-md text-muted">
                    His calendar fills quickly. If you would like him to minister at your event, send an invitation.
                  </p>
                  <div className="mt-6">
                    <Button href="/invite">Invite him</Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            list.map((e) => <EventCard key={e.id} event={e} past={tab === "past"} />)
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
