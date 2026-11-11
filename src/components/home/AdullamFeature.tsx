import Image from "next/image";
import { Button } from "@/components/Button";
import { Highlight, Reveal } from "@/components/motion";

const strengths = ["Doctrinal depth", "Leadership competence", "Practical ministry capacity"];

export function AdullamFeature() {
  return (
    <section className="container-x py-28 sm:py-40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal x={-30} y={0} className="relative">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/graduation-1.jpg"
              alt="Remnant Christian Network Theological Seminary (Adullam) graduates and faculty in academic regalia"
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-8 hidden w-40 overflow-hidden rounded-3xl border-4 border-ink sm:block lg:-right-10 lg:w-52">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/about-regalia.jpg"
                alt="Apostle Daniel Ogidi in purple academic regalia"
                fill
                sizes="208px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-4 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">Remnant Christian Network Theological Seminary (Adullam)</p>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.1] font-extrabold tracking-tight">
              Raising <Highlight>equipped</Highlight> ministers
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-fg/75">
              In 2015, responding to a growing need for structured ministerial training, Apostle Daniel led the
              establishment of the Remnant Christian Network Theological Seminary (Adullam) under the leadership of
              Apostle Arome Osayi. As its pioneer President, he continues to oversee a training system built to equip
              ministers for the work.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-3">
              {strengths.map((s) => (
                <li key={s} className="rounded-full border border-line bg-panel px-5 py-2.5 text-sm font-semibold">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/about#adullam">About Adullam</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
