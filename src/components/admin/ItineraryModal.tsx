"use client";

import { useState } from "react";
import { Button } from "../Button";
import { CopyButton } from "../CopyButton";
import { Check } from "../icons";
import { SelectField, TextArea, TextField } from "../form/Field";
import type { Invitation } from "@/data/admin";
import type { EventItem } from "@/data/itinerary";

const kinds: EventItem["kind"][] = ["Conference", "Leadership Training", "Mission Outreach", "Seminary", "Retreat"];

/** Lower-case, hyphenated, at most six words so ids stay short and never end mid-word. */
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .slice(0, 6)
    .join("-");

/** Best-effort split of "street, city, state, country" into city and country (always editable). */
function guessPlace(location: string) {
  const parts = location.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return { city: "", country: "" };
  if (parts.length === 1) return { city: parts[0], country: "" };
  // "street, city, …, country": the city is usually the second segment.
  return { city: parts.length >= 3 ? parts[1] : parts[0], country: parts[parts.length - 1] };
}

/** The entry as it would be pasted into src/data/itinerary.ts. */
export function toSnippet(e: EventItem) {
  const q = (v: string) => JSON.stringify(v);
  const lines = [
    "  {",
    `    id: ${q(e.id)},`,
    `    title: ${q(e.title)},`,
    `    kind: ${q(e.kind)},`,
    `    start: ${q(e.start)},`,
    `    end: ${q(e.end)},`,
    `    city: ${q(e.city)},`,
    `    country: ${q(e.country)},`,
    e.venue ? `    venue: ${q(e.venue)},` : null,
    e.host ? `    host: ${q(e.host)},` : null,
    `    description: ${q(e.description)},`,
    e.flyer
      ? `    flyer: { type: ${q(e.flyer.type ?? "Flyer")}, ${e.flyer.image ? `image: ${q(e.flyer.image)}, ` : ""}photo: ${q(e.flyer.photo ?? "/images/ministering-5.jpg")} },`
      : null,
    "  },",
  ];
  return lines.filter(Boolean).join("\n");
}

type Draft = {
  title: string;
  kind: EventItem["kind"];
  start: string;
  end: string;
  city: string;
  country: string;
  venue: string;
  host: string;
  description: string;
  flyerType: "Flyer" | "Invitation";
  useUploaded: boolean;
};

export function ItineraryModal({
  invitation,
  onConfirm,
  onClose,
}: {
  invitation: Invitation;
  onConfirm: (event: EventItem) => void;
  onClose: () => void;
}) {
  // An existing entry is shown as a result; otherwise start a new draft from the invitation.
  const existing = invitation.itinerary;
  const [done, setDone] = useState<EventItem | null>(existing ?? null);
  const place = guessPlace(invitation.location);

  const [draft, setDraft] = useState<Draft>({
    title: invitation.topic.length > 80 ? invitation.topic.slice(0, 77) + "…" : invitation.topic,
    kind: "Conference",
    start: invitation.dateFrom,
    end: invitation.dateTo,
    city: place.city,
    country: place.country,
    venue: invitation.organization,
    host: invitation.organization,
    description: invitation.burden.length > 200 ? invitation.burden.slice(0, 197) + "…" : invitation.burden,
    flyerType: "Flyer",
    useUploaded: Boolean(invitation.flyer),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});

  const set =
    <K extends keyof Draft>(key: K) =>
    (e: { target: { value: string } }) => {
      setDraft((d) => ({ ...d, [key]: e.target.value as Draft[K] }));
      if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
    };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found: typeof errors = {};
    if (draft.title.trim().length < 3) found.title = "Give the event a title.";
    if (!draft.start) found.start = "Choose the start date.";
    if (!draft.end) found.end = "Choose the end date.";
    else if (draft.start && draft.end < draft.start) found.end = "The end date must be on or after the start date.";
    if (!draft.city.trim()) found.city = "Enter the city (or “To be announced”).";
    setErrors(found);
    if (Object.keys(found).length) return;

    const event: EventItem = {
      id: slug(draft.title),
      title: draft.title.trim(),
      kind: draft.kind,
      start: draft.start,
      end: draft.end,
      city: draft.city.trim(),
      country: draft.country.trim(),
      venue: draft.venue.trim() || undefined,
      host: draft.host.trim() || undefined,
      description: draft.description.trim(),
      flyer: {
        type: draft.flyerType,
        photo: "/images/ministering-5.jpg",
        ...(draft.useUploaded && invitation.flyer ? { image: `/flyers/${invitation.flyer.name}` } : {}),
      },
    };
    onConfirm(event);
    setDone(event);
  }

  if (done) {
    const snippet = toSnippet(done);
    return (
      <div className="flex min-h-0 flex-col overflow-y-auto p-6 sm:p-9">
        <span className="grid size-12 place-items-center rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300">
          <Check />
        </span>
        <h2 className="mt-5 font-display text-2xl font-extrabold">
          {existing && done === existing ? "On the itinerary" : "Added to the itinerary"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-fg/70">
          <strong className="text-fg">{done.title}</strong> is marked <em>Scheduled</em>. This admin is frontend-only for now, so to
          publish it on the website paste the entry below into{" "}
          <code className="rounded bg-fg/10 px-1.5 py-0.5 text-xs">src/data/itinerary.ts</code>
          {invitation.flyer && done.flyer?.image && (
            <>
              {" "}
              and save the flyer as <code className="rounded bg-fg/10 px-1.5 py-0.5 text-xs">public{done.flyer.image}</code>
            </>
          )}
          . Once the database is connected this step becomes automatic.
        </p>
        <div className="relative mt-5 rounded-2xl border border-line bg-panel">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Itinerary entry</span>
            <CopyButton value={snippet} label="itinerary entry" />
          </div>
          <pre className="overflow-x-auto p-4 text-xs leading-relaxed">{snippet}</pre>
        </div>
        <div className="mt-6">
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-9">
        <p className="text-xs font-bold tracking-[0.2em] text-gold-ink uppercase">Add to itinerary</p>
        <h2 className="mt-2 pr-10 font-display text-2xl font-extrabold">Review the event details</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg/70">
          Pre-filled from {invitation.fullName}&apos;s invitation. Edit anything before it goes on the itinerary.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <TextField className="sm:col-span-2" label="Event title" name="title" required value={draft.title} onChange={set("title")} error={errors.title} />
          <SelectField label="Type of event" name="kind" options={kinds} value={draft.kind} onChange={set("kind")} />
          <SelectField label="Show as" name="flyerType" options={["Flyer", "Invitation"]} value={draft.flyerType} onChange={set("flyerType")} />
          <TextField label="Starts" name="start" type="date" required value={draft.start} onChange={set("start")} error={errors.start} />
          <TextField label="Ends" name="end" type="date" required value={draft.end} min={draft.start || undefined} onChange={set("end")} error={errors.end} />
          <TextField label="City" name="city" required value={draft.city} onChange={set("city")} error={errors.city} />
          <TextField label="Country" name="country" value={draft.country} onChange={set("country")} />
          <TextField label="Venue" name="venue" optional value={draft.venue} onChange={set("venue")} />
          <TextField label="Hosted by" name="host" optional value={draft.host} onChange={set("host")} />
          <TextArea className="sm:col-span-2" label="Short description" name="description" rows={3} value={draft.description} onChange={set("description")} />
        </div>

        {invitation.flyer && (
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-panel/60 p-4 text-sm">
            <input
              type="checkbox"
              checked={draft.useUploaded}
              onChange={(e) => setDraft((d) => ({ ...d, useUploaded: e.target.checked }))}
              className="mt-0.5 size-4 accent-[#f5b82e]"
            />
            <span>
              Use the uploaded flyer (<strong>{invitation.flyer.name}</strong>) on the itinerary
              <span className="block text-xs text-muted">Otherwise a designed flyer is generated from the details above.</span>
            </span>
          </label>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line bg-panel/60 px-6 py-4 sm:px-9">
        <Button variant="outline" arrow={false} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add to itinerary</Button>
      </div>
    </form>
  );
}
