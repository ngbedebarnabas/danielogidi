import type { ComponentType, SVGProps } from "react";
import { socialLinks, type SocialKey } from "@/data/site";
import { ArrowUpRight, Facebook, GraduationCap, Instagram, Telegram, Threads, TikTok, WhatsApp, Youtube } from "./icons";

const icons: Record<SocialKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  youtube: Youtube,
  whatsapp: WhatsApp,
  instagram: Instagram,
  telegram: Telegram,
  tiktok: TikTok,
  facebook: Facebook,
  college: GraduationCap,
  threads: Threads,
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Social profile links.
 *  - "icons": a row of round icon buttons (footer)
 *  - "list": icon + name + handle cards (contact page)
 */
export function SocialLinks({ variant = "icons", className = "" }: { variant?: "icons" | "list"; className?: string }) {
  if (variant === "list") {
    return (
      <ul className={`grid gap-2 ${className}`}>
        {socialLinks.map((s) => {
          const Icon = icons[s.key];
          return (
            <li key={s.key}>
              <a
                href={s.href}
                {...external}
                className="group flex items-center gap-3 rounded-2xl border border-line bg-bg p-3 transition-colors hover:border-gold hover:bg-gold/10"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink transition-colors group-hover:bg-gold group-hover:text-ink">
                  <Icon width={18} height={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{s.label}</span>
                  <span className="block truncate text-xs text-muted">{s.handle}</span>
                </span>
                <ArrowUpRight width={15} height={15} className="shrink-0 text-muted transition-colors group-hover:text-fg" />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((s) => {
        const Icon = icons[s.key];
        return (
          <li key={s.key}>
            <a
              href={s.href}
              {...external}
              aria-label={s.label}
              title={s.label}
              className="grid size-10 place-items-center rounded-full border border-line text-fg/80 transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              <Icon width={18} height={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
