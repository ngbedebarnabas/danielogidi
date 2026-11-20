"use client";

import { useState } from "react";
import { InvitationsPanel } from "./InvitationsPanel";
import { MessagesPanel } from "./MessagesPanel";
import { useSubmissions } from "@/lib/admin-store";

type Tab = "invitations" | "messages";

export function AdminApp() {
  const { invitations, messages, update, reset } = useSubmissions();
  const [tab, setTab] = useState<Tab>("invitations");

  const newInvitations = invitations.filter((i) => i.status === "new").length;
  const newMessages = messages.filter((m) => m.status === "new").length;

  const tabs: { id: Tab; label: string; total: number; unread: number }[] = [
    { id: "invitations", label: "Invitations", total: invitations.length, unread: newInvitations },
    { id: "messages", label: "Messages", total: messages.length, unread: newMessages },
  ];

  return (
    <div className="container-x pb-24">
      {/* Preview notice */}
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-relaxed">
          <strong>Frontend preview.</strong> There is no login or database yet. These are sample submissions, and your changes
          are saved only in this browser.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Reset the sample data? Your status changes and notes in this browser will be lost.")) reset();
          }}
          className="shrink-0 rounded-full border border-fg/25 px-4 py-2 text-xs font-bold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        >
          Reset sample data
        </button>
      </div>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Submissions</h1>
      <p className="mt-2 max-w-2xl text-fg/70">
        Everything sent through the website&apos;s forms. Track invitations and put accepted events on the itinerary, and keep
        on top of messages from the contact page.
      </p>

      {/* Main tabs */}
      <div className="mt-8 flex gap-2 border-b border-line" role="tablist" aria-label="Submission type">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`relative -mb-px flex items-center gap-2 border-b-2 px-3 py-3.5 text-sm font-bold transition-colors sm:gap-2.5 sm:px-6 ${
                active ? "border-gold text-fg" : "border-transparent text-muted hover:text-fg"
              }`}
            >
              {t.label}
              <span className="hidden rounded-full bg-fg/10 px-2 py-0.5 text-xs font-bold sm:inline">{t.total}</span>
              {t.unread > 0 && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-[0.7rem] font-extrabold whitespace-nowrap text-ink" title={`${t.unread} new`}>
                  {t.unread} new
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-8">
        {tab === "invitations" ? (
          <InvitationsPanel invitations={invitations} update={update} />
        ) : (
          <MessagesPanel messages={messages} update={update} />
        )}
      </div>
    </div>
  );
}
