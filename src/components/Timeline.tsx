"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/site";
import { Reveal } from "./motion";

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mx-auto max-w-5xl">
      {/* track + animated fill */}
      <span aria-hidden className="absolute top-0 bottom-0 left-4 w-px bg-line md:left-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gold md:left-1/2"
      />

      {timeline.map((t, i) => {
        const left = i % 2 === 0;
        return (
          <li key={t.title} className="relative pb-12 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
            <span
              aria-hidden
              className="absolute top-2 left-4 size-3.5 -translate-x-1/2 rounded-full border-2 border-gold bg-bg md:left-1/2"
            />
            <Reveal
              x={left ? -30 : 30}
              y={0}
              className={left ? "md:col-start-1 md:text-right" : "md:col-start-2"}
            >
              <p className="font-display text-sm font-extrabold tracking-[0.16em] text-gold-ink uppercase">{t.years}</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-fg/65">{t.body}</p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
