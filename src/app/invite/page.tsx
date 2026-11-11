import type { Metadata } from "next";
import Image from "next/image";
import { InviteForm } from "@/components/form/InviteForm";
import { Highlight, Reveal } from "@/components/motion";
import { PageHeader } from "@/components/PageHeader";
import { Star4 } from "@/components/Sparkle";

export const metadata: Metadata = {
  title: "Invite Apostle Daniel",
  description: "Invite Apostle Daniel Ogidi to minister or teach at your church, conference or organization.",
};

const steps = [
  ["Send the details", "Fill in the form with your ministry and event information."],
  ["Review", "His office reviews the request against his calendar and focus."],
  ["Response", "You hear back by email, usually with follow-up questions or next steps."],
];

export default function InvitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Invitations"
        title={
          <>
            <Highlight>Invite</Highlight> Apostle Daniel Ogidi
          </>
        }
        description="Tell us about your ministry and the gathering you have in mind. Every invitation is read and prayerfully considered."
        image="/images/podium-prayer.jpg"
        focus="50% 35%"
      />

      <section className="container-x pb-24 sm:pb-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-panel/60 p-6 sm:rounded-[2.5rem] sm:p-10">
              <InviteForm />
            </div>
          </Reveal>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line">
                <Image
                  src="/images/portrait-embroidered.jpg"
                  alt="Portrait of Apostle Daniel Ogidi in embroidered attire"
                  fill
                  sizes="(min-width: 1024px) 20rem, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-[2rem] border border-line bg-panel/60 p-7">
                <h2 className="font-display text-xl font-extrabold">What happens next</h2>
                <ol className="mt-5 space-y-5">
                  {steps.map(([t, d], i) => (
                    <li key={t} className="flex gap-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-sm font-extrabold text-ink">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed">
                        <span className="font-bold">{t}.</span> <span className="text-fg/65">{d}</span>
                      </p>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 flex items-start gap-3 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                  <Star4 className="mt-0.5 size-4 shrink-0 text-gold" />
                  Please send invitations as early as you can; his calendar is planned well ahead.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
