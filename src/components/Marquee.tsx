import { values } from "@/data/site";
import { Star4 } from "./Sparkle";

/** Endless ticker of ministry themes, like the "Creativity ✦ Excellence ✦ Reliability" band. */
export function Marquee() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {values.map((v) => (
        <li key={v} className="flex items-center">
          <span className="px-8 font-display text-3xl font-extrabold tracking-tight sm:px-12 sm:text-5xl">{v}</span>
          <Star4 className="size-6 shrink-0 text-gold sm:size-8" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-line py-8 sm:py-10" role="presentation">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
