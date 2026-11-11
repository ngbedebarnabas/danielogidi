import { Button } from "@/components/Button";
import { EventCard } from "@/components/EventCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TeachingCard } from "@/components/TeachingCard";
import { Highlight, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { teachings } from "@/data/teachings";
import { getEventBuckets } from "@/lib/events";

export async function ItineraryPreview() {
  const { upcoming } = await getEventBuckets();
  const next = upcoming.slice(0, 3);

  return (
    <section className="container-x py-24 sm:py-32">
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

export function TeachingsPreview() {
  return (
    <section className="container-x py-24 sm:py-32">
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
