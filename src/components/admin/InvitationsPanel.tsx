"use client";

import { useMemo, useRef, useState } from "react";
import { Calendar, CalendarPlus, Check, ChevronRight, NoteIcon, Pin, Search, Users } from "../icons";
import { AdminDialog } from "./AdminDialog";
import { InvitationDetail } from "./InvitationDetail";
import { ItineraryModal } from "./ItineraryModal";
import { StatusSelect, statusStyle } from "./StatusBadge";
import { initials } from "./utils";
import { statusMeta, statusOrder, type Invitation, type InvitationStatus } from "@/data/admin";
import { formatDay, formatRange } from "@/lib/dates";

type Filter = "all" | InvitationStatus;
type Sort = "newest" | "oldest" | "event";

const sorts: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "event", label: "Event date (soonest)" },
];

function haystack(i: Invitation) {
  return [
    i.id,
    i.fullName,
    i.organization,
    i.email,
    i.phone,
    i.location,
    i.social,
    i.background,
    i.ministrySize,
    i.topic,
    i.burden,
    i.audienceSize,
    i.audienceTypes.join(" "),
    i.sessionDetails,
    i.comments,
    i.itinerary?.title ?? "",
    ...i.notes.map((n) => n.text),
  ]
    .join(" ")
    .toLowerCase();
}

export function InvitationsPanel({
  invitations,
  update,
}: {
  invitations: Invitation[];
  update: (id: string, patch: (i: Invitation) => Partial<Invitation>) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [openId, setOpenId] = useState<string | null>(null);
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    const c = { all: invitations.length } as Record<Filter, number>;
    for (const s of statusOrder) c[s] = invitations.filter((i) => i.status === s).length;
    return c;
  }, [invitations]);

  const list = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const rows = invitations.filter(
      (i) => (filter === "all" || i.status === filter) && terms.every((t) => haystack(i).includes(t)),
    );
    rows.sort((a, b) =>
      sort === "newest"
        ? b.receivedAt.localeCompare(a.receivedAt)
        : sort === "oldest"
          ? a.receivedAt.localeCompare(b.receivedAt)
          : a.dateFrom.localeCompare(b.dateFrom),
    );
    return rows;
  }, [invitations, query, filter, sort]);

  const open = invitations.find((i) => i.id === openId) ?? null;
  const scheduling = invitations.find((i) => i.id === scheduleId) ?? null;
  const filtering = query.trim() !== "" || filter !== "all";

  const addNote = (id: string, text: string) =>
    update(id, (i) => ({ notes: [...i.notes, { id: `n${Date.now()}`, text, at: new Date().toISOString() }] }));

  return (
    <div>
      {/* Status tiles double as filters */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label="Filter invitations by status">
        {(["all", ...statusOrder] as Filter[]).map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                active ? "border-gold bg-gold/15" : "border-line bg-panel/70 hover:border-fg/30"
              }`}
            >
              <span className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-muted uppercase">
                {f !== "all" && <span className={`size-2 rounded-full ${statusStyle[f].dot}`} />}
                {f === "all" ? "All" : statusMeta[f].label}
              </span>
              <span className="mt-1 block font-display text-3xl font-extrabold">{counts[f]}</span>
            </button>
          );
        })}
      </div>

      {/* Search + sort */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="invitation-search" className="sr-only">
            Search invitations
          </label>
          <Search width={18} height={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg/45" />
          <input
            ref={searchRef}
            id="invitation-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Search name, ministry, email, topic, location, notes…"
            className="w-full rounded-full border border-line bg-panel py-3.5 pr-5 pl-11 text-sm placeholder:text-fg/40 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="invitation-sort" className="sr-only">
            Sort by
          </label>
          <select
            id="invitation-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="w-full cursor-pointer rounded-full border border-line bg-panel px-5 py-3.5 text-sm font-semibold focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none sm:w-auto"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value} className="bg-panel">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "invitation" : "invitations"}
        {filtering && " match"}
        {filtering && (
          <>
            {" · "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="font-bold text-gold-ink hover:underline"
            >
              Clear filters
            </button>
          </>
        )}
      </p>

      {/* List */}
      {list.length === 0 ? (
        <div className="mt-4 rounded-[1.75rem] border border-dashed border-line p-12 text-center">
          <p className="font-display text-xl font-extrabold">No invitations found</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Try a different search term or status.</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((i) => (
            <li
              key={i.id}
              className="group grid gap-4 rounded-[1.5rem] border border-line bg-panel/70 p-4 transition-colors hover:border-gold/50 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5"
            >
              <button
                type="button"
                onClick={() => setOpenId(i.id)}
                className="grid min-w-0 grid-cols-[auto_1fr] items-start gap-4 text-left"
                aria-label={`Open invitation from ${i.fullName}`}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold font-display text-sm font-extrabold text-ink">
                  {initials(i.fullName)}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-display text-lg font-extrabold">{i.fullName}</span>
                    <span className="text-sm text-fg/65">{i.organization}</span>
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm text-fg/80">{i.topic}</span>
                  <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar width={13} height={13} /> {formatRange(i.dateFrom, i.dateTo)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Pin width={13} height={13} /> {i.location.split(",").slice(-2).join(",").trim()}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users width={13} height={13} /> {i.audienceSize}
                    </span>
                    {i.notes.length > 0 && (
                      <span className="inline-flex items-center gap-1.5">
                        <NoteIcon width={13} height={13} /> {i.notes.length} {i.notes.length === 1 ? "note" : "notes"}
                      </span>
                    )}
                  </span>
                </span>
              </button>

              <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                <StatusSelect value={i.status} onChange={(s) => update(i.id, () => ({ status: s }))} label={`Status of ${i.fullName}'s invitation`} />
                <span className="text-xs text-muted">Received {formatDay(i.receivedAt)}</span>
                <div className="flex items-center gap-2 sm:mt-1">
                  {i.itinerary ? (
                    <button
                      type="button"
                      onClick={() => setScheduleId(i.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-4 py-2 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-500/25 dark:text-violet-300"
                    >
                      <Check width={14} height={14} /> On itinerary
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setScheduleId(i.id)}
                      disabled={i.status === "declined"}
                      title={i.status === "declined" ? "Reopen this invitation to add it to the itinerary" : undefined}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-ink transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <CalendarPlus width={14} height={14} /> Add to itinerary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenId(i.id)}
                    aria-label={`Open invitation from ${i.fullName}`}
                    className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <ChevronRight width={16} height={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Detail drawer */}
      <AdminDialog open={open !== null} onClose={() => setOpenId(null)} label="Invitation details" variant="side">
        {open && (
          <InvitationDetail
            invitation={open}
            onStatus={(s) => update(open.id, () => ({ status: s }))}
            onAddNote={(text) => addNote(open.id, text)}
            onDeleteNote={(nid) => update(open.id, (i) => ({ notes: i.notes.filter((n) => n.id !== nid) }))}
            onAddToItinerary={() => setScheduleId(open.id)}
          />
        )}
      </AdminDialog>

      {/* Add to itinerary */}
      <AdminDialog open={scheduling !== null} onClose={() => setScheduleId(null)} label="Add to itinerary" z={110}>
        {scheduling && (
          <ItineraryModal
            key={scheduling.id}
            invitation={scheduling}
            onClose={() => setScheduleId(null)}
            onConfirm={(event) =>
              update(scheduling.id, (i) => ({
                status: "scheduled",
                itinerary: event,
                notes: [
                  ...i.notes,
                  { id: `n${Date.now()}`, at: new Date().toISOString(), text: `Added to the itinerary as “${event.title}”.` },
                ],
              }))
            }
          />
        )}
      </AdminDialog>
    </div>
  );
}
