import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";
import { Button } from "@/components/Button";
import { Highlight, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Star4 } from "@/components/Sparkle";
import { Timeline } from "@/components/Timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Apostle Daniel Ogidi: over 37 years in ministry, International Director of Remnant Christian Network and pioneer President of Remnant Christian Network Theological Seminary (Adullam).",
};

const roles = [
  { title: "International Director", org: "Remnant Christian Network", since: "Since 2021" },
  { title: "Pioneer President", org: "Remnant Christian Network Theological Seminary (Adullam)", since: "Since 2015" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A life given to <Highlight>apostolic</Highlight> service
          </>
        }
        description="Over 37 years in active ministry, centred on apostolic leadership, doctrinal teaching, leadership development and global missions."
        image="/images/hero-stage-2.jpg"
        imageAlt=""
        focus="20% 40%"
      />

      {/* Bio */}
      <section className="container-x py-20 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal x={-24} y={0} className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <Star4 className="absolute -top-6 -right-4 z-10 size-14 text-gold" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line">
                <Image
                  src="/images/about-portrait.jpg"
                  alt="Portrait of Apostle Daniel Ogidi in a plaid blazer"
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
            <ul className="mt-6 grid gap-3">
              {roles.map((r) => (
                <li key={r.title} className="rounded-2xl border border-line bg-panel/70 px-5 py-4">
                  <p className="font-display text-lg font-extrabold">{r.title}</p>
                  <p className="text-sm text-fg/70">{r.org}</p>
                  <p className="mt-1 text-xs font-bold tracking-[0.16em] text-gold-ink uppercase">{r.since}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Stagger className="space-y-6 text-[1.05rem] leading-[1.85] text-fg/75">
            {[
              <>
                <strong className="text-fg">Apostle Daniel Ogidi</strong> serves as the International Director of
                Remnant Christian Network and the pioneer President of Remnant Christian Network Theological Seminary
                (Adullam). With over 37 years in active ministry, his work is centred on apostolic leadership, doctrinal
                teaching, leadership development, and global missions.
              </>,
              <>
                He has demonstrated a progressive leadership trajectory within the ministry, beginning as a pioneering
                member at its inception in 2007 in Makurdi, Benue State, following a sustained period of prayer and
                intercession. He subsequently served as Ministry Administrator in 2010 and was formally ordained into
                apostolic office in 2013. Since his appointment as International Director in 2021, he has provided
                oversight for international operations, ministry expansion, and leadership coordination across multiple
                regions.
              </>,
              <>
                In response to the growing need for structured ministerial training, he led the establishment of the
                Remnant Christian Network Theological Seminary (Adullam) in 2015 under the leadership of Apostle Arome
                Osayi. As the pioneer President, he continues to oversee the development of a training system focused on
                equipping ministers with doctrinal depth, leadership competence, and practical ministry capacity.
              </>,
              <>
                His ministry engagements span multiple nations, where he has led conferences, leadership trainings, and
                mission outreaches aimed at strengthening church systems and raising equipped leaders. His experience
                includes operating within diverse cultural and ecclesiastical contexts, with a consistent emphasis on
                doctrinal accuracy, discipleship, and leadership formation.
              </>,
              <>
                Earlier in his ministry journey, he was actively engaged in evangelism and discipleship, including
                pastoral service in a rural mission church (1997–2000) and sustained campus ministry involvement between
                2004 and 2009. These formative experiences contributed to his long-term focus on grassroots discipleship
                and leadership development.
              </>,
            ].map((p, i) => (
              <StaggerItem key={i}>
                <p>{p}</p>
              </StaggerItem>
            ))}

            <StaggerItem>
              <blockquote className="relative mt-10 rounded-[1.75rem] border border-gold/30 bg-gold/[0.06] p-7 sm:p-9">
                <Star4 className="mb-4 size-7 text-gold" />
                <p className="font-display text-xl leading-snug font-bold text-fg sm:text-2xl">
                  Given his cross-cultural ministry experience, institutional leadership, and sustained contribution to
                  ministerial training and apostolic work, his involvement provides strategic value to initiatives
                  requiring doctrinal teaching, leadership development, and mission strengthening.
                </p>
              </blockquote>
            </StaggerItem>

            <StaggerItem className="pt-4">
              <div className="flex flex-wrap gap-3">
                <Button href="/invite">Send Invite</Button>
                <Button href="/teachings" variant="outline">
                  Explore his teachings
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Journey */}
      <section className="container-x py-20 sm:py-32">
        <SectionHeading eyebrow="The journey">
          From the mission field to <Highlight>global</Highlight> oversight
        </SectionHeading>
        <div className="mt-16">
          <Timeline />
        </div>
      </section>

      {/* Adullam */}
      <section id="adullam" className="container-x scroll-mt-24 py-20 sm:py-32">
        <div className="gold-glow relative overflow-hidden rounded-[2rem] border border-line bg-panel/70 p-6 sm:rounded-[3rem] sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal x={-24} y={0} className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/images/about-regalia.jpg"
                  alt="Apostle Daniel Ogidi in purple academic regalia"
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/images/about-seminary.jpg"
                  alt="Apostle Daniel Ogidi in academic regalia at a seminary event"
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mb-4 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">Adullam</p>
              <h2 className="font-display text-[clamp(1.65rem,4vw,3rem)] leading-[1.1] font-extrabold tracking-tight">
                Remnant Christian Network <Highlight>Theological</Highlight> Seminary
              </h2>
              <p className="mt-6 leading-relaxed text-fg/75">
                Established in 2015 under the leadership of Apostle Arome Osayi, Adullam answers the growing need for
                structured ministerial training. Apostle Daniel Ogidi led its founding and serves as its pioneer
                President, overseeing a training system focused on three things:
              </p>
              <ul className="mt-6 grid gap-3">
                {[
                  ["Doctrinal depth", "Ministers grounded in sound, accurate teaching."],
                  ["Leadership competence", "Leaders able to guide people and organisations well."],
                  ["Practical ministry capacity", "Skills for the day-to-day work of serving the church."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-4 rounded-2xl border border-line bg-bg/60 p-4">
                    <Star4 className="mt-1 size-5 shrink-0 text-gold" />
                    <p>
                      <span className="font-bold">{t}.</span> <span className="text-fg/65">{d}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
