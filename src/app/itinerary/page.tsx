import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ItineraryList } from "@/components/ItineraryList";
import { Highlight, Reveal } from "@/components/motion";
import { PageHeader } from "@/components/PageHeader";
import { getEventBuckets } from "@/lib/events";

export const metadata: Metadata = {
  title: "Itinerary",
  description:
    "Upcoming conferences, trainings and outreaches where Apostle Daniel Ogidi will be ministering, with the flyer or invitation for each.",
};

export default async function ItineraryPage() {
  const { upcoming, past } = await getEventBuckets();

  return (
    <>
      <PageHeader
        eyebrow="Itinerary & flyers"
        title={
          <>
            Where he will be <Highlight>ministering</Highlight>
          </>
        }
        description="Upcoming conferences, leadership trainings and mission outreaches, each with its flyer. Tap a flyer to view it larger. Dates may change, so please confirm with the host ministry."
        image="/images/ministering-5.jpg"
        focus="30% 40%"
      />

      <section className="container-x pb-16 sm:pb-24">
        <ItineraryList upcoming={upcoming} past={past} />
      </section>

      <section className="container-x py-20 sm:py-32">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-gold/30 bg-gold/[0.06] p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Don&apos;t see your date?</h2>
            <p className="mt-2 max-w-lg text-fg/70">
              Invitations are welcome for conferences, trainings, outreaches and church services. Send the details and
              his office will respond.
            </p>
          </div>
          <Button href="/invite">Send Invite</Button>
        </Reveal>
      </section>
    </>
  );
}
