"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/Button";
import { CountUp, Highlight } from "@/components/motion";
import { Burst, Star4 } from "@/components/Sparkle";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 44 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.15 + i * 0.12 } }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} className="mb-16 px-2 sm:mb-28 sm:px-3">
      <div data-theme="dark" className="relative isolate text-fg flex min-h-[100svh] flex-col overflow-hidden rounded-b-[2.25rem] bg-ink sm:rounded-b-[4rem] lg:rounded-b-[5rem]">
        {/* Photo (hero 3) with parallax */}
        <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[4%] -z-20 h-[72%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:left-auto lg:-bottom-[6%] lg:h-auto lg:w-[72%] lg:[mask-image:linear-gradient(to_right,transparent,black_38%)]">
          <Image
            src="/images/hero-portrait.jpg"
            alt="Apostle Daniel Ogidi seated in front of his library, smiling"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[68%_center] lg:object-[72%_center]"
          />
        </motion.div>

        {/* Light dark overlay: even tint + a left/bottom fade for text legibility */}
        <div className="absolute inset-0 -z-10 bg-ink/35 max-lg:bottom-auto max-lg:h-[72%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/60 via-transparent to-ink/30 lg:bg-gradient-to-r lg:from-ink/60 lg:via-transparent lg:to-transparent" />

        <motion.div style={{ y: contentY }} className="container-x relative flex flex-1 flex-col justify-end pt-32 pb-10 sm:pt-40 lg:justify-center lg:pb-16">
          <Burst className="pointer-events-none absolute top-28 right-6 hidden size-16 animate-spin-slow text-gold sm:block lg:top-36 lg:right-10 lg:size-20" />

          <div className="max-w-3xl lg:max-w-[52rem]">
            <motion.p
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-fg/25 bg-fg/10 px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] uppercase backdrop-blur-md"
            >
              <Star4 className="size-3 text-gold" />
              International Director · Remnant Christian Network
            </motion.p>

            <motion.h1
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-6 font-display text-[clamp(1.9rem,4vw,4rem)] leading-[1.03] font-extrabold tracking-tight"
            >
              Equipping Leaders.
              <br />
              Strengthening the <Highlight>Church.</Highlight>
            </motion.h1>

            <motion.p
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-6 hidden max-w-xl text-base leading-relaxed text-fg/80 sm:block sm:text-lg"
            >
              Apostle Daniel Ogidi brings over 37 years of apostolic leadership, doctrinal teaching and global missions,
              raising ministers with depth and churches with strong foundations.
            </motion.p>

            <motion.div
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
            >
              <Button href="/invite">Send Invite</Button>
              <Button href="/about" variant="glass">
                Read his story
              </Button>
            </motion.div>
          </div>

          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-8 flex items-center gap-5 sm:mt-12 border-t border-fg/20 pt-6 lg:absolute lg:right-8 lg:bottom-16 lg:mt-0 lg:flex-col lg:items-end lg:gap-1 lg:border-0 lg:pt-0 lg:text-right"
          >
            <p className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
              <CountUp to={37} suffix="+" />
            </p>
            <div className="flex items-center gap-2">
              <Star4 className="size-4 shrink-0 text-gold" />
              <p className="text-xs font-semibold tracking-[0.16em] text-fg/75 uppercase">Years in active ministry</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
