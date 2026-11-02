import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "./motion";
import { Burst } from "./Sparkle";

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  focus = "center",
}: {
  eyebrow: string;
  /** Heading; wrap the key word in <Highlight>. */
  title: ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  /** CSS object-position for the background image */
  focus?: string;
}) {
  return (
    <header
      data-theme="dark"
      className="gold-glow relative mx-2 overflow-hidden rounded-b-[2.25rem] bg-ink pt-36 pb-16 text-fg sm:mx-3 sm:rounded-b-[4rem] sm:pt-44 sm:pb-24"
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover opacity-45"
            style={{ objectPosition: focus }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/15" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        </>
      )}
      <Burst className="pointer-events-none absolute top-32 right-[6%] hidden size-20 animate-spin-slow text-gold/90 sm:block" />

      <div className="container-x relative">
        <Reveal y={20}>
          <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">
            <span className="h-px w-10 bg-gold" /> {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl font-display text-[clamp(1.75rem,7vw,5.5rem)] leading-[1.04] font-extrabold tracking-tight">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg/70">{description}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
