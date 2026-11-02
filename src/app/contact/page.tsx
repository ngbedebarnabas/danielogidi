import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/form/ContactForm";
import { Facebook, Instagram, Mail, Phone, Pin, XIcon, Youtube } from "@/components/icons";
import { Highlight, Reveal } from "@/components/motion";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the office of Apostle Daniel Ogidi.",
};

const socials = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "x", label: "X", Icon: XIcon },
] as const;

export default function ContactPage() {
  const { email, phone, location } = site.contact;
  const activeSocials = socials.filter((s) => site.socials[s.key]);
  const details: { Icon: typeof Mail; label: string; value: string; href?: string }[] = [];
  if (email) details.push({ Icon: Mail, label: "Email", value: email, href: `mailto:${email}` });
  if (phone) details.push({ Icon: Phone, label: "Phone", value: phone, href: `tel:${phone}` });
  if (location) details.push({ Icon: Pin, label: "Office", value: location });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <Highlight>connect</Highlight>
          </>
        }
        description="For general enquiries, media, ministry partnership or Adullam Seminary, send a message and the right person will get back to you."
        image="/images/hero-stage.jpg"
        focus="20% 35%"
      />

      <section className="container-x pb-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <aside className="space-y-4">
            <Reveal>
              <div className="rounded-[2rem] border border-gold/30 bg-gold/[0.06] p-7">
                <h2 className="font-display text-xl font-extrabold">Inviting him to an event?</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg/70">
                  Use the dedicated invitation form so we have the dates, location and topic we need.
                </p>
                <Link
                  href="/invite"
                  className="mt-5 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
                >
                  Go to invitation form
                </Link>
              </div>
            </Reveal>

            {details.length > 0 && (
              <Reveal delay={0.08}>
                <ul className="space-y-1 rounded-[2rem] border border-line bg-panel/60 p-4">
                  {details.map(({ Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink">
                          <Icon width={20} height={20} />
                        </span>
                        <span>
                          <span className="block text-xs font-bold tracking-[0.16em] text-muted uppercase">{label}</span>
                          <span className="block break-all text-sm font-semibold">{value}</span>
                        </span>
                      </>
                    );
                    return (
                      <li key={label}>
                        {href ? (
                          <a href={href} className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-fg/5">
                            {inner}
                          </a>
                        ) : (
                          <div className="flex items-center gap-4 p-3">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            )}

            <Reveal delay={0.16}>
              <div className="rounded-[2rem] border border-line bg-panel/60 p-7">
                <h2 className="font-display text-lg font-extrabold">Ministry</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg/70">
                  International Director, Remnant Christian Network. Pioneer President, Remnant Christian Network
                  Theological Seminary (Adullam).
                </p>
                {activeSocials.length > 0 && (
                  <ul className="mt-5 flex gap-3">
                    {activeSocials.map(({ key, label, Icon }) => (
                      <li key={key}>
                        <a
                          href={site.socials[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                        >
                          <Icon width={18} height={18} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </aside>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-line bg-panel/60 p-6 sm:rounded-[2.5rem] sm:p-10">
              <h2 className="mb-8 font-display text-2xl font-extrabold">Send a message</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
