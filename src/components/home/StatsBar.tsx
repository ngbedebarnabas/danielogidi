import { stats } from "@/data/site";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";

export function StatsBar() {
  return (
    <section className="container-x pt-16 sm:pt-24">
      <Stagger className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-line bg-panel/80 sm:rounded-[2.5rem] lg:grid-cols-4">
        {stats.map((s, i) => (
          <StaggerItem
            key={s.label}
            className={`px-6 py-8 text-center sm:py-10 ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i > 1 ? "border-t border-line lg:border-t-0" : ""
            } ${i > 0 ? "lg:border-l" : ""}`}
          >
            <p className="font-display text-[1.7rem] font-extrabold tracking-tight min-[400px]:text-4xl sm:text-5xl">
              {"count" in s && s.count ? <CountUp to={s.value as number} suffix={"suffix" in s ? s.suffix : ""} /> : s.value}
            </p>
            <p className="mx-auto mt-2 max-w-[14ch] text-xs leading-snug text-muted sm:max-w-[18ch] sm:text-sm">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-fg/70 sm:text-base">
          A steady record of apostolic leadership, doctrinal teaching and global missions across more than three decades.
        </p>
      </Reveal>
    </section>
  );
}
