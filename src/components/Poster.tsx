import Image from "next/image";
import { Star4 } from "./Sparkle";

export type FlyerItem = {
  id: string;
  type: "Flyer" | "Invitation";
  title: string;
  subtitle?: string;
  /** Display date, e.g. "4 – 6 Dec 2026" */
  date: string;
  location: string;
  host?: string;
  /** Real artwork path; when set, shown instead of the generated flyer */
  image?: string;
  /** Backdrop photo for the generated flyer */
  photo: string;
  /** CSS object-position for the photo */
  focus?: string;
};

/** Largest title size (in cqw) that keeps the longest word inside `avail` cqw of width. */
function fitSize(title: string, avail: number, max: number) {
  const longest = Math.max(...title.split(/\s+/).map((w) => w.length));
  return Math.min(max, avail / (longest * 0.88));
}

/**
 * Renders a flyer or invitation. If the item has real artwork (`image`) it is
 * shown as-is; otherwise a designed poster is generated from the item's text.
 * Type is sized in container-query units (cqw) so it scales with the card.
 */
export function Poster({ item, sizes = "(min-width: 1024px) 30vw, 90vw" }: { item: FlyerItem; sizes?: string }) {
  if (item.image) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-panel">
        <Image src={item.image} alt={`${item.type}: ${item.title}`} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return item.type === "Invitation" ? <InvitationArt item={item} sizes={sizes} /> : <FlyerArt item={item} sizes={sizes} />;
}

function FlyerArt({ item, sizes }: { item: FlyerItem; sizes: string }) {
  return (
    <div className="@container relative aspect-[4/5] overflow-hidden bg-ink text-white">
      <Image
        src={item.photo}
        alt=""
        fill
        sizes={sizes}
        className="object-cover grayscale-[0.25]"
        style={{ objectPosition: item.focus }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
      <div className="absolute inset-[3.5cqw] border border-gold/60" />

      <div className="absolute inset-0 flex flex-col justify-between p-[8cqw]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[1.6cqw] text-[2.6cqw] font-bold tracking-[0.2em] uppercase">
            <Star4 className="size-[4.5cqw] text-gold" />
            {item.host ?? "Apostle Daniel Ogidi"}
          </span>
        </div>

        <div>
          {item.subtitle && (
            <p className="mb-[2cqw] text-[3.2cqw] font-bold tracking-[0.16em] text-gold uppercase">{item.subtitle}</p>
          )}
          <h3
            className="font-display leading-[1.05] font-extrabold tracking-tight"
            style={{ fontSize: `${fitSize(item.title, 82, 9.5)}cqw` }}
          >
            {item.title}
          </h3>
          <div className="my-[4cqw] h-px w-[14cqw] bg-gold" />
          <p className="text-[5cqw] font-extrabold text-gold">{item.date}</p>
          <p className="mt-[1cqw] text-[3.6cqw] text-white/85">{item.location}</p>
          <p className="mt-[5cqw] text-[2.8cqw] font-bold tracking-[0.2em] text-white/60 uppercase">
            Ministering: Apostle Daniel Ogidi
          </p>
        </div>
      </div>
    </div>
  );
}

function InvitationArt({ item, sizes }: { item: FlyerItem; sizes: string }) {
  return (
    <div className="@container relative aspect-[4/5] overflow-hidden bg-paper text-ink">
      <div className="absolute inset-[3.5cqw] border border-gold" />
      <div className="absolute inset-[5cqw] border border-ink/15" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[11cqw] pt-[2cqw] text-center">
        <div className="relative size-[20cqw] overflow-hidden rounded-full ring-[0.8cqw] ring-gold ring-offset-[1.2cqw] ring-offset-paper">
          <Image src={item.photo} alt="" fill sizes={sizes} className="object-cover" style={{ objectPosition: item.focus }} />
        </div>
        <p className="mt-[4.5cqw] text-[2.8cqw] font-bold tracking-[0.34em] uppercase">You are invited</p>
        <h3
          className="mt-[3cqw] font-display leading-[1.08] font-extrabold tracking-tight"
          style={{ fontSize: `${fitSize(item.title, 74, 8.2)}cqw` }}
        >
          {item.title}
        </h3>
        {item.subtitle && <p className="mt-[1.5cqw] text-[3cqw] leading-snug text-ink/70 italic">{item.subtitle}</p>}
        <Star4 className="my-[3cqw] size-[4cqw] text-gold" />
        <p className="text-[3cqw] font-bold tracking-[0.18em] uppercase">Ministering</p>
        <p className="font-display text-[4.6cqw] font-extrabold">Apostle Daniel Ogidi</p>
        <p className="mt-[3cqw] text-[4.2cqw] font-extrabold">{item.date}</p>
        <p className="mt-[1cqw] text-[3.4cqw] text-ink/70">{item.location}</p>
      </div>
    </div>
  );
}
