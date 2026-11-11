import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { Highlight, Stagger, StaggerItem } from "@/components/motion";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { TeachingsBrowser } from "@/components/TeachingsBrowser";
import { teachings, teachingThemes } from "@/data/teachings";

export const metadata: Metadata = {
  title: "Teachings",
  description:
    "Teachings from Apostle Daniel Ogidi on apostolic leadership, doctrine, leadership development, discipleship and missions.",
};

export default function TeachingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Teachings"
        title={
          <>
            Teaching rooted in <Highlight>doctrine</Highlight>
          </>
        }
        description="Messages and resources on apostolic leadership, doctrinal accuracy, discipleship and the formation of equipped leaders."
        image="/images/hero-stage.jpg"
        focus="20% 35%"
      />

      <section className="container-x py-16 sm:py-28">
        <SectionHeading eyebrow="Themes">
          What he <Highlight>teaches</Highlight>
        </SectionHeading>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachingThemes.map((t, i) => (
            <StaggerItem
              key={t.title}
              className="rounded-[1.75rem] border border-line bg-panel/70 p-7 transition-colors duration-300 hover:border-gold/50"
            >
              <span className="font-display text-sm font-extrabold text-gold-ink">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-extrabold">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg/65">{t.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x py-16 sm:py-28">
        <SectionHeading eyebrow="Library">
          Watch, listen &amp; <Highlight>read</Highlight>
        </SectionHeading>
        <div className="mt-12">
          <TeachingsBrowser items={teachings} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
