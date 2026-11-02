import { cacheLife } from "next/cache";
import { events, type EventItem } from "@/data/itinerary";

export type EventBuckets = { upcoming: EventItem[]; past: EventItem[] };

/**
 * Splits the itinerary into upcoming and past. Reading the current date is
 * non-deterministic, so it lives inside a cached function that refreshes hourly.
 */
export async function getEventBuckets(): Promise<EventBuckets> {
  "use cache";
  cacheLife("hours");

  const today = new Date().toISOString().slice(0, 10);
  const byStart = (a: EventItem, b: EventItem) => a.start.localeCompare(b.start);

  return {
    upcoming: events.filter((e) => e.end >= today).sort(byStart),
    past: events.filter((e) => e.end < today).sort((a, b) => byStart(b, a)),
  };
}
