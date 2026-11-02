import Image from "next/image";
import { Button } from "@/components/Button";
import { Highlight, Reveal } from "@/components/motion";
import { Star4 } from "@/components/Sparkle";

export function Intro() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.1] font-extrabold tracking-tight">
              Sent to build <Highlight>leaders</Highlight> and strengthen the church
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-10">
            <Star4 className="absolute -top-8 -left-4 z-10 size-14 text-gold" />
            <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/hero-stage.jpg"
                alt="Apostle Daniel Ogidi smiling as he ministers with a microphone"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <Reveal delay={0.1} className="space-y-5 text-[1.02rem] leading-relaxed text-fg/75">
            <p>
              Apostle Daniel Ogidi serves as International Director of Remnant Christian Network and pioneer President
              of its Theological Seminary (Adullam). For over 37 years his work has centred on apostolic leadership,
              doctrinal teaching, leadership development and global missions.
            </p>
            <p>
              From pioneering the ministry in Makurdi in 2007 to overseeing its international operations today, his
              emphasis has stayed constant: doctrinal accuracy, discipleship and the formation of equipped leaders.
            </p>
            <Button href="/about" className="mt-2">
              Read his full story
            </Button>
          </Reveal>

          <Reveal delay={0.2} className="relative ml-auto w-3/4 max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line">
              <Image
                src="/images/about-portrait.jpg"
                alt="Portrait of Apostle Daniel Ogidi in a plaid blazer"
                fill
                sizes="(min-width: 1024px) 24vw, 70vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
