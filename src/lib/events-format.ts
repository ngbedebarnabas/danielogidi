import type { EventItem } from "@/data/itinerary";
import type { FlyerItem } from "@/components/Poster";
import { formatRange } from "./dates";

// Kept apart from lib/events.ts, which holds the cached ("use cache") loader,
// so that client components can import this without pulling server code.
export function eventLocation(e: Pick<EventItem, "city" | "country">) {
  return [e.city, e.country].filter(Boolean).join(", ");
}

/** Builds the flyer/invitation shown beside an event. */
export function eventToFlyer(e: EventItem): FlyerItem {
  return {
    id: e.id,
    type: e.flyer?.type ?? "Flyer",
    title: e.title,
    subtitle: e.flyer?.subtitle,
    date: formatRange(e.start, e.end),
    location: eventLocation(e) || e.venue || "To be announced",
    host: e.host,
    image: e.flyer?.image,
    photo: e.flyer?.photo ?? "/images/ministering-5.jpg",
    focus: e.flyer?.focus,
  };
}
