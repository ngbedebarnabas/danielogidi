import { Button } from "./Button";
import { Calendar } from "./icons";
import { Reveal } from "./motion";
import { Burst } from "./Sparkle";
import { socialLinks } from "@/data/site";

const whatsapp = socialLinks.find((s) => s.key === "whatsapp");

/** Shown in place of the itinerary while the CMS is being connected. */
export function ItineraryComingSoon({ compact = false }: { compact?: boolean }) {
  return (
    <Reveal>
      <div
        className={`gold-glow relative overflow-hidden rounded-[2rem] border border-gold/40 bg-panel text-center sm:rounded-[2.5rem] ${
          compact ? "px-6 py-12 sm:py-14" : "px-6 py-16 sm:px-12 sm:py-24"
        }`}
      >
        <Burst className="pointer-events-none absolute -top-8 -right-8 size-28 animate-spin-slow text-gold/40" />
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-gold text-ink">
          <Calendar width={28} height={28} />
        </span>
        <p className="mt-6 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">Itinerary</p>
        <h2 className={`mt-2 font-display font-extrabold tracking-tight ${compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}>
          Coming soon
        </h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-fg/70">
          Upcoming conferences, leadership trainings and mission outreaches will be listed here shortly. Follow along for
          updates, or invite Apostle Daniel to your event.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/invite">Send Invite</Button>
          {whatsapp && (
            <Button href={whatsapp.href} variant="outline" target="_blank" rel="noopener noreferrer">
              Follow on WhatsApp
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
}
