import Image from "next/image";
import type { TeachingItem } from "@/data/teachings";
import { ArrowUpRight, FileText, Headphones, Play } from "./icons";

const formatIcon = { Video: Play, Audio: Headphones, Article: FileText } as const;
const cta = { Video: "Watch", Audio: "Listen", Article: "Read" } as const;

export function TeachingCard({ item }: { item: TeachingItem }) {
  const Icon = formatIcon[item.format];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-panel/70 transition-colors duration-300 hover:border-gold/50">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover grayscale-[0.35] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
        <span data-theme="dark" className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-ink/80 text-fg px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] uppercase backdrop-blur">
          <Icon width={13} height={13} className="text-gold-ink" />
          {item.format}
          {item.length && <span className="text-fg/60">· {item.length}</span>}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-[0.18em] text-gold-ink uppercase">{item.category}</p>
        <h3 className="mt-2 font-display text-xl leading-tight font-extrabold">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-fg/65">{item.summary}</p>

        <div className="mt-6">
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
            >
              {cta[item.format]} <ArrowUpRight width={16} height={16} />
            </a>
          ) : (
            <span className="inline-flex rounded-full border border-fg/20 px-5 py-2.5 text-sm font-semibold text-fg/60">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
