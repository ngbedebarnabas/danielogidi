import type { EventItem } from "@/data/itinerary";
import { dayParts, formatRange, googleCalendarUrl } from "@/lib/dates";
import { eventLocation } from "@/lib/events-format";
import { Calendar, Pin } from "./icons";

export function EventCard({ event, past = false }: { event: EventItem; past?: boolean }) {
  const { day, month, year } = dayParts(event.start);
  const where = eventLocation(event);

  return (
    <article
      className={`group grid gap-5 rounded-[1.75rem] border border-line bg-panel/70 p-5 transition-colors duration-300 hover:border-gold/50 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-6 ${
        past ? "opacity-70" : ""
      }`}
    >
      <div className="flex size-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-gold text-ink transition-transform duration-300 group-hover:-rotate-3 sm:size-28">
        <span className="font-display text-4xl leading-none font-extrabold sm:text-5xl">{day}</span>
        <span className="mt-1 text-xs font-extrabold tracking-[0.2em]">{month}</span>
        <span className="text-[0.65rem] font-semibold opacity-70">{year}</span>
      </div>

      <div>
        <p className="mb-2 inline-block rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-gold-ink uppercase">
          {event.kind}
        </p>
        <h3 className="font-display text-xl leading-tight font-extrabold sm:text-2xl">{event.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg/65">{event.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg/80">
          <li className="flex items-center gap-2">
            <Calendar width={16} height={16} className="text-gold-ink" />
            {formatRange(event.start, event.end)}
          </li>
          <li className="flex items-center gap-2">
            <Pin width={16} height={16} className="text-gold-ink" />
            {[event.venue, where].filter(Boolean).join(" · ")}
          </li>
        </ul>
        {event.host && <p className="mt-2 text-xs text-muted">Hosted by {event.host}</p>}
      </div>

      {!past && (
        <a
          href={googleCalendarUrl({
            title: event.title,
            start: event.start,
            end: event.end,
            where: [event.venue, where].filter(Boolean).join(", "),
            details: event.description,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-fg/25 px-5 py-3 text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        >
          <Calendar width={15} height={15} /> Add to calendar
        </a>
      )}
    </article>
  );
}
