import Link from "next/link";
import { Button } from "@/components/Button";
import { EventCard } from "@/components/EventCard";
import { Poster } from "@/components/Poster";
import { SectionHeading } from "@/components/SectionHeading";
import { TeachingCard } from "@/components/TeachingCard";
import { Highlight, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { flyers } from "@/data/flyers";
import { teachings } from "@/data/teachings";
import { getEventBuckets } from "@/lib/events";

export async function ItineraryPreview() {
  const { upcoming } = await getEventBuckets();
  const next = upcoming.slice(0, 3);

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Itinerary"
        action={<Button href="/itinerary" variant="outline">Full itinerary</Button>}
      >
        Where he will be <Highlight>ministering</Highlight>
      </SectionHeading>

      <div className="mt-12 flex flex-col gap-4">
        {next.length ? (
          next.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08}>
              <EventCard event={e} />
            </Reveal>
          ))
        ) : (
          <Reveal>
            <p className="rounded-[1.75rem] border border-dashed border-line p-10 text-center text-muted">
              No upcoming engagements are listed right now. Check back soon, or send an invitation.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function FlyersPreview() {
  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Flyers & invitations"
        action={<Button href="/flyers" variant="outline">All flyers</Button>}
      >
        Programmes, <Highlight>flyers</Highlight> and invitations
      </SectionHeading>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flyers.slice(0, 3).map((f) => (
          <StaggerItem key={f.id}>
            <Link
              href="/flyers"
              aria-label={`${f.type}: ${f.title}`}
              className="group block overflow-hidden rounded-[1.5rem] border border-line transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_24px_60px_-20px_rgba(245,184,46,0.35)]"
            >
              <Poster item={f} />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function TeachingsPreview() {
  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Teachings"
        action={<Button href="/teachings" variant="outline">All teachings</Button>}
      >
        Doctrine that builds <Highlight>leaders</Highlight>
      </SectionHeading>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teachings.slice(0, 3).map((t) => (
          <StaggerItem key={t.id}>
            <TeachingCard item={t} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
