// Dates are stored as "YYYY-MM-DD" and always formatted in UTC so the
// output never shifts with the visitor's timezone.

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts });

export function formatRange(startIso: string, endIso: string) {
  const s = parse(startIso);
  const e = parse(endIso);
  const sameDay = startIso === endIso;
  const sameMonth = s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear();
  const sameYear = s.getUTCFullYear() === e.getUTCFullYear();

  if (sameDay) return fmt({ day: "numeric", month: "short", year: "numeric" }).format(s);
  if (sameMonth) {
    return `${s.getUTCDate()} – ${fmt({ day: "numeric", month: "short", year: "numeric" }).format(e)}`;
  }
  if (sameYear) {
    return `${fmt({ day: "numeric", month: "short" }).format(s)} – ${fmt({ day: "numeric", month: "short", year: "numeric" }).format(e)}`;
  }
  const full = fmt({ day: "numeric", month: "short", year: "numeric" });
  return `${full.format(s)} – ${full.format(e)}`;
}

/** "Add to Google Calendar" link for an all-day event spanning start..end (inclusive). */
export function googleCalendarUrl(e: { title: string; start: string; end: string; where?: string; details?: string }) {
  const compact = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");
  const endExclusive = parse(e.end);
  endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${compact(parse(e.start))}/${compact(endExclusive)}`,
    ...(e.where ? { location: e.where } : {}),
    ...(e.details ? { details: e.details } : {}),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function dayParts(iso: string) {
  const d = parse(iso);
  return {
    day: String(d.getUTCDate()).padStart(2, "0"),
    month: fmt({ month: "short" }).format(d).toUpperCase(),
    year: String(d.getUTCFullYear()),
  };
}
