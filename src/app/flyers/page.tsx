import type { Metadata } from "next";
import { FlyersBrowser } from "@/components/FlyersBrowser";
import { Highlight } from "@/components/motion";
import { PageHeader } from "@/components/PageHeader";
import { CtaBanner } from "@/components/CtaBanner";
import { flyers } from "@/data/flyers";

export const metadata: Metadata = {
  title: "Flyers & Invitations",
  description: "Flyers and invitations for events where Apostle Daniel Ogidi is ministering. View, share or download.",
};

export default function FlyersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Flyers & invitations"
        title={
          <>
            Programmes, <Highlight>flyers</Highlight> &amp; invitations
          </>
        }
        description="Browse the flyers and invitations for upcoming gatherings. Tap any one to view it larger."
        image="/images/altar-crowd.jpg"
        focus="75% 40%"
      />

      <section className="container-x pb-12">
        <FlyersBrowser items={flyers} />
      </section>

      <CtaBanner />
    </>
  );
}
