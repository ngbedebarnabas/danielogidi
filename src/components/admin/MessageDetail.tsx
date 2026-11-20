"use client";

import { Button } from "../Button";
import { Check, Mail, Phone } from "../icons";
import { NotesPanel } from "./NotesPanel";
import { MessageStatusBadge, MessageStatusSelect } from "./StatusBadge";
import { sensitiveSubjects, type Message, type MessageStatus } from "@/data/admin";
import { formatDay } from "@/lib/dates";

const quote = (m: Message) =>
  `\n\n\nOn ${formatDay(m.receivedAt)}, ${m.name} wrote:\n` + m.message.split("\n").map((l) => `> ${l}`).join("\n");

/** mailto: link that pre-fills a reply with the original message quoted. */
export const replyHref = (m: Message) =>
  `mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}&body=${encodeURIComponent(quote(m))}`;

export function MessageDetail({
  message: m,
  onStatus,
  onAddNote,
  onDeleteNote,
}: {
  message: Message;
  onStatus: (s: MessageStatus) => void;
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
}) {
  const sensitive = sensitiveSubjects.includes(m.subject);

  return (
    <>
      <header className="px-6 pt-7 pb-6 sm:px-9">
        <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
          {m.id} · Received {formatDay(m.receivedAt)}
        </p>
        <h2 className="mt-2 pr-12 font-display text-2xl leading-tight font-extrabold sm:text-3xl">{m.name}</h2>
        <p className="mt-1 text-fg/70">{m.subject}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <MessageStatusSelect value={m.status} onChange={onStatus} />
          {sensitive && (
            <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-bold text-rose-700 dark:text-rose-300">
              Sensitive
            </span>
          )}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto" data-lenis-prevent>
        {sensitive && (
          <p className="mx-6 mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm leading-relaxed sm:mx-9">
            This may contain personal or pastoral details. Share it only with the pastoral team and avoid forwarding it by
            email.
          </p>
        )}

        <section className="border-t border-line px-6 py-6 sm:px-9">
          <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold-ink uppercase">Message</h3>
          <p className="text-[0.95rem] leading-relaxed whitespace-pre-line">{m.message}</p>
        </section>

        <section className="border-t border-line px-6 py-6 sm:px-9">
          <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold-ink uppercase">Contact</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${m.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-fg/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              <Mail width={16} height={16} /> {m.email}
            </a>
            {m.phone && (
              <a
                href={`tel:${m.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-fg/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
              >
                <Phone width={16} height={16} /> {m.phone}
              </a>
            )}
          </div>
        </section>

        <section className="border-t border-line px-6 py-6 sm:px-9">
          <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold-ink uppercase">Notes ({m.notes.length})</h3>
          <NotesPanel notes={m.notes} onAdd={onAddNote} onDelete={onDeleteNote} inputId="new-message-note" />
        </section>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-panel/70 px-6 py-4 sm:px-9">
        <MessageStatusBadge status={m.status} />
        <div className="flex flex-wrap items-center gap-2">
          {m.status !== "replied" && (
            <Button arrow={false} variant="outline" onClick={() => onStatus("replied")}>
              <span className="inline-flex items-center gap-2">
                <Check width={15} height={15} /> Mark replied
              </span>
            </Button>
          )}
          <Button arrow={false} href={replyHref(m)}>
            <span className="inline-flex items-center gap-2">
              <Mail width={16} height={16} /> Reply by email
            </span>
          </Button>
        </div>
      </footer>
    </>
  );
}
