import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function SectionHeading({
  eyebrow,
  children,
  action,
  className = "",
}: {
  eyebrow?: string;
  /** The heading. Wrap the key word in <Highlight>. */
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col justify-between gap-6 sm:flex-row sm:items-end ${className}`}>
      <Reveal>
        {eyebrow && (
          <p className="mb-4 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">{eyebrow}</p>
        )}
        <h2 className="max-w-3xl font-display text-[clamp(1.75rem,4.6vw,3.6rem)] leading-[1.1] font-extrabold tracking-tight">
          {children}
        </h2>
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
