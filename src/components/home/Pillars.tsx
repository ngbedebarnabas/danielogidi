"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Highlight, Reveal } from "@/components/motion";
import { Burst } from "@/components/Sparkle";
import { pillars } from "@/data/site";

/** Interactive list + image, modelled on the "Our Services" panel in the reference. */
export function Pillars() {
  const [active, setActive] = useState(0);
  const current = pillars[active];

  return (
    <section className="container-x">
      <div className="gold-glow relative overflow-hidden rounded-[2rem] border border-line bg-panel/70 p-6 sm:rounded-[3rem] sm:p-12">
        <Burst className="absolute -top-6 -right-6 hidden size-28 animate-spin-slow text-gold sm:block" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="flex flex-col">
            <Reveal>
              <p className="mb-4 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">Areas of ministry</p>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.1] font-extrabold tracking-tight">
                What he <Highlight>carries</Highlight>
              </h2>
              <p className="mt-5 max-w-md text-fg/70">
                Six areas of focus that shape his ministry, built on more than three decades of service.
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-3" role="tablist" aria-label="Areas of ministry">
              {pillars.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`relative flex w-full items-center gap-4 rounded-full border px-5 py-4 text-left transition-colors ${
                        on ? "border-transparent text-white" : "border-fg/20 text-fg/70 hover:border-fg/40"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="pillar-pill"
                          className="absolute inset-0 rounded-full bg-ink ring-1 ring-gold/60"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className={`relative font-display text-sm font-extrabold ${on ? "text-gold" : "text-gold-ink"}`}>0{i + 1}</span>
                      <span className="relative text-sm font-semibold sm:text-base">{p.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-10">
              <Button href="/about" variant="glass">
                Meet Apostle Daniel
              </Button>
              <Button href="/invite">Send Invite</Button>
            </div>
          </div>

          <div className="relative min-h-[26rem] sm:min-h-[34rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                role="tabpanel"
                data-theme="dark"
                className="absolute inset-0 text-fg overflow-hidden rounded-[1.75rem]"
              >
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover grayscale-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-extrabold">{current.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">{current.body}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
