import Link from "next/link";
import { Star4 } from "./Sparkle";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Apostle Daniel Ogidi, home"
      className={`flex items-center gap-2.5 ${className}`}
    >
      <Star4 className="size-6 shrink-0 text-gold" />
      <span className="font-display text-[0.8rem] leading-[1.05] font-extrabold tracking-wider text-fg uppercase">
        Apostle Daniel
        <br />
        Ogidi
      </span>
    </Link>
  );
}
