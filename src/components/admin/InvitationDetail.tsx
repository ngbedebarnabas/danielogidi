"use client";

import { Button } from "../Button";
import { Calendar, CalendarPlus, FileText, Mail, Phone, Pin, Users } from "../icons";
import { NotesPanel } from "./NotesPanel";
import { StatusBadge, StatusSelect } from "./StatusBadge";
import type { Invitation, InvitationStatus } from "@/data/admin";
import { formatDay, formatRange } from "@/lib/dates";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line px-6 py-6 sm:px-9">
      <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold-ink uppercase">{title}</h3>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-bold tracking-[0.12em] text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed whitespace-pre-line">{children}</dd>
    </div>
  );
}

export function InvitationDetail({
  invitation: inv,
  onStatus,
  onAddNote,
  onDeleteNote,
  onAddToItinerary,
}: {
  invitation: Invitation;
  onStatus: (s: InvitationStatus) => void;
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  onAddToItinerary: () => void;
}) {
  const isImage = inv.flyer && /\.(jpe?g|png|webp)$/i.test(inv.flyer.url);


  return (
    <>
      {/* Header */}
      <header className="px-6 pt-7 pb-6 sm:px-9">
        <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
          {inv.id} · Received {formatDay(inv.receivedAt)}
        </p>
        <h2 className="mt-2 pr-12 font-display text-2xl leading-tight font-extrabold sm:text-3xl">{inv.fullName}</h2>
        <p className="mt-1 text-fg/70">{inv.organization}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <StatusSelect value={inv.status} onChange={onStatus} />
          {inv.itinerary && (
            <span className="text-xs text-muted">
              On itinerary: <strong className="text-fg">{inv.itinerary.title}</strong>
            </span>
          )}
        </div>
      </header>

      {/* Scrollable body */}
      <div className="min-h-0 flex-1 overflow-y-auto" data-lenis-prevent>
        <Section title="The event">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Topic">{inv.topic}</Field>
            </div>
            <Field label="Dates">
              <span className="inline-flex items-center gap-2">
                <Calendar width={15} height={15} className="text-gold-ink" /> {formatRange(inv.dateFrom, inv.dateTo)}
              </span>
            </Field>
            <Field label="Audience size">
              <span className="inline-flex items-center gap-2">
                <Users width={15} height={15} className="text-gold-ink" /> {inv.audienceSize}
              </span>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Burden / emphasis">{inv.burden}</Field>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-bold tracking-[0.12em] text-muted uppercase">Audience</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {inv.audienceTypes.map((t) => (
                  <span key={t} className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <Field label="Sessions to minister">{inv.sessions}</Field>
            <Field label="Time & duration">{inv.sessionDetails}</Field>
          </dl>
        </Section>

        {inv.flyer && (
          <Section title="Flyer">
            <div className="flex items-center gap-4">
              {isImage ? (
                // eslint-disable-next-line @next/next/no-img-element -- sample/uploaded file, not optimisable
                <img src={inv.flyer.url} alt="" className="size-20 shrink-0 rounded-xl object-cover" />
              ) : (
                <span className="grid size-20 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-ink">
                  <FileText width={28} height={28} />
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{inv.flyer.name}</p>
                <a
                  href={inv.flyer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-bold text-gold-ink hover:underline"
                >
                  Open file
                </a>
              </div>
            </div>
          </Section>
        )}

        <Section title="Ministry / organization">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Background">{inv.background}</Field>
            </div>
            <Field label="Size">{inv.ministrySize}</Field>
            <Field label="Location">
              <span className="inline-flex items-start gap-2">
                <Pin width={15} height={15} className="mt-0.5 shrink-0 text-gold-ink" /> {inv.location}
              </span>
            </Field>
            {inv.social && (
              <Field label="Social">
                {inv.social.startsWith("http") ? (
                  <a href={inv.social} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-ink hover:underline">
                    {inv.social}
                  </a>
                ) : (
                  inv.social
                )}
              </Field>
            )}
          </dl>
        </Section>

        <Section title="Contact">
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${inv.email}?subject=${encodeURIComponent(`Your invitation: ${inv.topic}`)}`}
              className="inline-flex items-center gap-2 rounded-full border border-fg/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              <Mail width={16} height={16} /> {inv.email}
            </a>
            <a
              href={`tel:${inv.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-fg/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              <Phone width={16} height={16} /> {inv.phone}
            </a>
          </div>
          {inv.comments && (
            <div className="mt-5">
              <dl>
                <Field label="Their comments">{inv.comments}</Field>
              </dl>
            </div>
          )}
        </Section>

        <Section title={`Notes (${inv.notes.length})`}>
          <NotesPanel notes={inv.notes} onAdd={onAddNote} onDelete={onDeleteNote} />
        </Section>
      </div>

      {/* Footer actions */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-panel/70 px-6 py-4 sm:px-9">
        <StatusBadge status={inv.status} />
        {inv.status === "declined" ? (
          <p className="text-xs text-muted">Reopen it (change status) to add it to the itinerary.</p>
        ) : (
          <Button arrow={false} onClick={onAddToItinerary}>
            <span className="inline-flex items-center gap-2">
              <CalendarPlus width={16} height={16} /> {inv.itinerary ? "View itinerary entry" : "Add to itinerary"}
            </span>
          </Button>
        )}
      </footer>
    </>
  );
}
