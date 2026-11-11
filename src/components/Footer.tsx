import { cacheLife } from "next/cache";
import Link from "next/link";
import { site } from "@/data/site";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { Burst } from "./Sparkle";
import { Facebook, Instagram, Mail, Phone, XIcon, Youtube } from "./icons";

async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const socials = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "x", label: "X", Icon: XIcon },
] as const;

export function Footer() {
  const activeSocials = socials.filter((s) => site.socials[s.key]);

  return (
    <footer data-theme="dark" className="gold-glow relative text-fg mt-10 overflow-hidden rounded-t-[2.5rem] border-t border-line bg-coal sm:rounded-t-[4rem]">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Burst className="mb-6 size-14 animate-spin-slow text-gold" />
            <h2 className="font-display text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-4xl xl:text-[2.6rem]">
              Have a church, conference or gathering in mind?
            </h2>
            <p className="mt-5 max-w-md text-muted">
              Invite Apostle Daniel Ogidi to minister, teach or train leaders at your event.
            </p>
            <div className="mt-8">
              <Button href="/invite">Send Invite</Button>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-gold uppercase">Explore</h3>
            <ul className="space-y-3">
              {[{ href: "/", label: "Home" }, ...site.nav, { href: "/invite", label: "Send Invite" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-gold uppercase">Ministry</h3>
            <p className="text-sm leading-relaxed text-white/80">
              International Director,
              <br />
              Remnant Christian Network
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Pioneer President,
              <br />
              Remnant Christian Network
              <br />
              Theological Seminary (Adullam)
            </p>

            <div className="mt-6 space-y-3 text-sm">
              {site.contact.email && (
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-white/80 hover:text-gold">
                  <Mail width={18} height={18} /> {site.contact.email}
                </a>
              )}
              {site.contact.phone && (
                <a href={`tel:${site.contact.phone}`} className="flex items-center gap-3 text-white/80 hover:text-gold">
                  <Phone width={18} height={18} /> {site.contact.phone}
                </a>
              )}
            </div>

            {activeSocials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {activeSocials.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={site.socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-10 place-items-center rounded-full border border-line text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      <Icon width={18} height={18} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <Logo />
          <p className="text-xs text-muted">
            © <Year /> {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
