import type { EventItem } from "@/data/itinerary";

// Kept apart from lib/events.ts, which holds the cached ("use cache") loader,
// so that client components can import this without pulling server code.
export function eventLocation(e: Pick<EventItem, "city" | "country">) {
  return [e.city, e.country].filter(Boolean).join(", ");
}
