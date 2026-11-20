"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Mail, NoteIcon, Phone, Search } from "../icons";
import { AdminDialog } from "./AdminDialog";
import { MessageDetail, replyHref } from "./MessageDetail";
import { MessageStatusSelect, messageStatusStyle } from "./StatusBadge";
import { initials } from "./utils";
import {
  messageStatusMeta,
  messageStatusOrder,
  sensitiveSubjects,
  type Message,
  type MessageStatus,
} from "@/data/admin";
import { formatDay } from "@/lib/dates";
import { contactSubjects } from "@/lib/validation";

type Filter = "all" | MessageStatus;
type Sort = "newest" | "oldest";

const haystack = (m: Message) =>
  [m.id, m.name, m.email, m.phone, m.subject, m.message, ...m.notes.map((n) => n.text)].join(" ").toLowerCase();

export function MessagesPanel({
  messages,
  update,
}: {
  messages: Message[];
  update: (id: string, patch: (m: Message) => Partial<Message>) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [subject, setSubject] = useState("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c = { all: messages.length } as Record<Filter, number>;
    for (const s of messageStatusOrder) c[s] = messages.filter((m) => m.status === s).length;
    return c;
  }, [messages]);

  const list = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const rows = messages.filter(
      (m) =>
        (filter === "all" || m.status === filter) &&
        (subject === "all" || m.subject === subject) &&
        terms.every((t) => haystack(m).includes(t)),
    );
    rows.sort((a, b) => (sort === "newest" ? b.receivedAt.localeCompare(a.receivedAt) : a.receivedAt.localeCompare(b.receivedAt)));
    return rows;
  }, [messages, query, filter, subject, sort]);

  const open = messages.find((m) => m.id === openId) ?? null;
  const filtering = query.trim() !== "" || filter !== "all" || subject !== "all";
  const setStatus = (id: string, status: MessageStatus) => update(id, () => ({ status }));

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="tablist" aria-label="Filter messages by status">
        {(["all", ...messageStatusOrder] as Filter[]).map((f) => {
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
                {f !== "all" && <span className={`size-2 rounded-full ${messageStatusStyle[f].dot}`} />}
                {f === "all" ? "All" : messageStatusMeta[f].label}
              </span>
              <span className="mt-1 block font-display text-3xl font-extrabold">{counts[f]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="message-search" className="sr-only">
            Search messages
          </label>
          <Search width={18} height={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg/45" />
          <input
            id="message-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Search name, email, subject, message, notes…"
            className="w-full rounded-full border border-line bg-panel py-3.5 pr-5 pl-11 text-sm placeholder:text-fg/40 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="message-subject" className="sr-only">
            Subject
          </label>
          <select
            id="message-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="cursor-pointer rounded-full border border-line bg-panel px-5 py-3.5 text-sm font-semibold focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none sm:max-w-[16rem]"
          >
            <option value="all" className="bg-panel">
              All subjects
            </option>
            {contactSubjects.map((s) => (
              <option key={s} value={s} className="bg-panel">
                {s}
              </option>
            ))}
          </select>
          <label htmlFor="message-sort" className="sr-only">
            Sort by
          </label>
          <select
            id="message-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="cursor-pointer rounded-full border border-line bg-panel px-5 py-3.5 text-sm font-semibold focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
          >
            <option value="newest" className="bg-panel">
              Newest first
            </option>
            <option value="oldest" className="bg-panel">
              Oldest first
            </option>
          </select>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "message" : "messages"}
        {filtering && " match"}
        {filtering && (
          <>
            {" · "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
                setSubject("all");
              }}
              className="font-bold text-gold-ink hover:underline"
            >
              Clear filters
            </button>
          </>
        )}
      </p>

      {list.length === 0 ? (
        <div className="mt-4 rounded-[1.75rem] border border-dashed border-line p-12 text-center">
          <p className="font-display text-xl font-extrabold">No messages found</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Try a different search term, subject or status.</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((m) => {
            const sensitive = sensitiveSubjects.includes(m.subject);
            return (
              <li
                key={m.id}
                className={`grid gap-4 rounded-[1.5rem] border border-line bg-panel/70 p-4 transition-colors hover:border-gold/50 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5 ${
                  m.status === "archived" ? "opacity-70" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(m.id)}
                  className="grid min-w-0 grid-cols-[auto_1fr] items-start gap-4 text-left"
                  aria-label={`Open message from ${m.name}`}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold font-display text-sm font-extrabold text-ink">
                    {initials(m.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="font-display text-lg font-extrabold">{m.name}</span>
                      <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-[0.65rem] font-bold tracking-[0.1em] text-gold-ink uppercase">
                        {m.subject.length > 28 ? "Adullam seminary" : m.subject}
                      </span>
                      {sensitive && (
                        <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[0.65rem] font-bold text-rose-700 dark:text-rose-300">
                          Sensitive
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-fg/80">{m.message}</span>
                    <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail width={13} height={13} /> {m.email}
                      </span>
                      {m.phone && (
                        <span className="inline-flex items-center gap-1.5">
                          <Phone width={13} height={13} /> {m.phone}
                        </span>
                      )}
                      {m.notes.length > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                          <NoteIcon width={13} height={13} /> {m.notes.length} {m.notes.length === 1 ? "note" : "notes"}
                        </span>
                      )}
                    </span>
                  </span>
                </button>

                <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                  <MessageStatusSelect
                    value={m.status}
                    onChange={(s) => setStatus(m.id, s)}
                    label={`Status of ${m.name}'s message`}
                  />
                  <span className="text-xs text-muted">Received {formatDay(m.receivedAt)}</span>
                  <div className="flex items-center gap-2 sm:mt-1">
                    {m.status !== "replied" && (
                      <button
                        type="button"
                        onClick={() => setStatus(m.id, "replied")}
                        className="inline-flex items-center gap-1.5 rounded-full border border-fg/25 px-3.5 py-2 text-xs font-bold transition-colors hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
                      >
                        <Check width={14} height={14} /> Replied
                      </button>
                    )}
                    <a
                      href={replyHref(m)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-2 text-xs font-bold text-ink transition-colors hover:bg-gold-soft"
                    >
                      <Mail width={14} height={14} /> Reply
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpenId(m.id)}
                      aria-label={`Open message from ${m.name}`}
                      className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      <ChevronRight width={16} height={16} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AdminDialog open={open !== null} onClose={() => setOpenId(null)} label="Message details" variant="side">
        {open && (
          <MessageDetail
            message={open}
            onStatus={(s) => setStatus(open.id, s)}
            onAddNote={(text) =>
              update(open.id, (m) => ({ notes: [...m.notes, { id: `n${Date.now()}`, text, at: new Date().toISOString() }] }))
            }
            onDeleteNote={(nid) => update(open.id, (m) => ({ notes: m.notes.filter((n) => n.id !== nid) }))}
          />
        )}
      </AdminDialog>
    </div>
  );
}
