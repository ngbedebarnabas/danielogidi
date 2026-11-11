import Image from "next/image";
import { Button } from "./Button";
import { Highlight, Reveal } from "./motion";

export function CtaBanner() {
  return (
    <section className="container-x py-16 sm:py-28">
      <div data-theme="dark" className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-fg sm:rounded-[3.5rem]">
        <Image
          src="/images/hero-stage-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[30%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

        <div className="px-7 py-16 sm:px-14 sm:py-24 lg:px-20">
          <Reveal>
            <p className="mb-4 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">Invitations</p>
            <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.08] font-extrabold tracking-tight">
              Host Apostle Daniel at your next <Highlight>gathering</Highlight>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/75">
              Conferences, leadership trainings, mission outreaches and church services. Tell us about your event and he
              will be glad to consider it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/invite">Send Invite</Button>
              <Button href="/itinerary" variant="glass">
                See his itinerary
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
